import { v4 as makeUUID } from 'uuid';

import EventBus from './EventBus';
import { Templator } from './Templator';
import { BlockChildrenType, EventBusInterface, PropsBase } from '../types/common.types';

abstract class Block<P extends Record<string, unknown> & PropsBase = Record<string, unknown> & PropsBase> {
  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    INIT: 'init',
  };

  private _element: HTMLElement | null = null;
  protected template: string = '';
  private _id: string | null = null;
  protected props: P;
  protected children: BlockChildrenType = {};
  private eventBus: () => EventBusInterface;

  constructor(propsAndChildren: P = {} as P, template: string = '') {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;
    this.template = template;

    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, _id: this._id } as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBusInterface) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    if ('currentMessage' in newProps && oldProps.currentMessage !== newProps.currentMessage) {
      return false;
    }

    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  protected afterRender(): void {}

  public dispatchAfterRender(): void {
    this.afterRender();
    Object.values(this.children).forEach((child) => child.dispatchAfterRender());
  }

  public setProps = (nextProps: Partial<P>) => {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Templator.compile(this.render(), propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) stub.replaceWith(child.getContent());
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
    this._addAttributes();
    this._addClassList();
    this.afterRender();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) throw new Error('Element is not created');

    return this._element;
  }

  private _makePropsProxy(props: P): P {
    const self = this;

    return new Proxy(props, {
      deleteProperty() {
        throw new Error(`Attempt to delete property blocked.`);
      },
      set(target, prop: string, val) {
        const oldProps = { ...target } as P;

        (target as Record<string, unknown>)[prop] = val;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  protected _addEvents() {
    const events: Record<string, EventListener> = this.props.events || {};

    if (!this._element) return;

    const nonBubblingEvents = new Set(['blur', 'focus', 'mouseenter', 'mouseleave']);
    const inputEl = this._element.querySelector('input, textarea, select');

    Object.entries(events).forEach(([eventName, handler]) => {
      const targetEl = nonBubblingEvents.has(eventName) && inputEl ? inputEl : this._element;

      targetEl?.addEventListener(eventName, handler);
    });
  }

  protected _removeEvents(): void {
    if (!this._element) return;

    const events: Record<string, EventListener> = this.props.events || {};
    const nonBubblingEvents = new Set(['blur', 'focus', 'mouseenter', 'mouseleave']);
    const inputEl = this._element.querySelector('input, textarea, select');

    Object.entries(events).forEach(([eventName, handler]) => {
      const targetEl = nonBubblingEvents.has(eventName) && inputEl ? inputEl : this._element;

      targetEl?.removeEventListener(eventName, handler);
    });
  }

  protected _addAttributes(): void {
    const content = this.getContent();
    const attributes: Record<string, string>[] = this.props.attributes || [];
    const dataIdAttribute = this._id ? [{ 'data-id': this._id }] : [];
    const allAttributes: Record<string, string>[] = [...attributes, ...dataIdAttribute];

    allAttributes.forEach((attr) => {
      const [[name, value]] = Object.entries(attr);

      content.setAttribute(name, value);
    });
  }

  protected _addClassList(list: string[] = []): void {
    const content = this.getContent();
    const classList: string[] = this.props.classList || [];
    const allClasses = [...classList, ...list];

    allClasses.forEach((className) => content.classList.add(className));
  }

  private _getChildren(propsAndChildren: P): { children: Record<string, Block>; props: P } {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, val]) => {
      if (val instanceof Block) children[key] = val;
      else props[key] = val;
    });

    return { children, props: props as P };
  }

  public hide(): void {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }

  public show(displayStyle: string = ''): void {
    if (this._element) {
      this._element.style.display = displayStyle;
    }
  }
}

export default Block;

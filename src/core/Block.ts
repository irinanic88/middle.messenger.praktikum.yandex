import {EventBusType} from "./types";
import EventBus from "./EventBus";
import {v4 as makeUUID} from 'uuid';
import {Templator} from "./Templator";


abstract class Block<P extends Record<string, any> = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _element: HTMLElement | null = null;
  protected template: string = '';
  private _id: string | null = null;
  protected props: P;
  protected children: Record<string, Block> = {};
  private eventBus: () => EventBusType;

  /** JSDoc
   * @param {Object} propsAndChildren
   * @param {String} template
   *
   * @returns {void}
   */
  constructor( propsAndChildren: P = {} as P, template: string = '') {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;
    this.template = template;

    this._id = makeUUID();

    this.props = this._makePropsProxy({...props, _id: this._id});

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }


  private init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER );
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    console.log('I am mounting now in Block');

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  protected dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    console.log('I am updating now in Block');

    if(response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps, newProps) {
    return true;
  }

  public setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: Record<string, any> = {...this.props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Templator.compile(this.render(), propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if(stub) {
        stub.replaceWith(child.getContent());
      }
    })

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this._addAttributes();
    this._addClassList();
  }

  protected render(): string {
    return '';
  };

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: P): P {

    const self = this;

    return new Proxy(props, {
      set(target, prop: string, val) {
        const oldProps = {...target};

        (target as any)[prop] = val;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, [oldProps, target]);

        return true;
      },

      deleteProperty(target, prop) {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName:string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  protected _addEvents() {
    const {events={} as any} = this.props;

    Object.keys(events).forEach(eventName => {
      if(this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  protected _addAttributes(): void {
    const content = this.getContent();
    const attributes = this.props.attributes || [];
    const dataIdAttribute = this._id ? [{'data-id': this._id}] : [];
    const allAttributes: Record<string, string>[] | [] =  [...attributes, ...dataIdAttribute];

    if(content && allAttributes.length > 0) {
      allAttributes.forEach((attr) => {
        const [[name, value]] = Object.entries(attr);
        content.setAttribute(name, value);
      });
    }
  }

  protected _addClassList(list : string[] | [] = []): void {
    const content = this.getContent();
    const classList = this.props.classList || [];
    const allClasses = [...classList, ...list];
    if(content && allClasses.length > 0) {
      allClasses.forEach((className) => {
        content.classList.add(className);
      })
    }
  }

  private _getChildren(propsAndChildren: P): {children: Record<string, Block>, props: P} {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, val]) => {
      if (val instanceof Block) {
        children[key] = val;
      } else {
        props[key] = val;
      }

    })

    return { children, props: props as P };
  }

  public show(): void {
    this._addClassList(['show-component']);
  }

  public hide(): void {
    this._addClassList(['show-component']);
  }
}

export default Block;

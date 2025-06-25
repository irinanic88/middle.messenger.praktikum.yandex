import template from './Link.hbs?raw';
import './Link.css';
import Block from "../../core/Block";
import {LinkPropsType} from "./Link.types";

export class Link extends Block<LinkPropsType> {
  constructor(props) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          props.onClick();
        },
      }})
  }

  render(): string {
    return template;
  }
}



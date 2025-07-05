import template from './Button.hbs?raw';
import './Button.css';
import Block from "../../core/Block";
import {ButtonPropsType} from "./Button.types";

export class Button extends Block<ButtonPropsType> {
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

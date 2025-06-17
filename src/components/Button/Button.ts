import Block from "../../core/Block";
import {ButtonPropsTypes} from "./Button.types";
import './Button.css';


export class Button extends Block<ButtonPropsTypes> {
  constructor(props) {
    super("button", props);
  }

  render(): DocumentFragment {
    const { name } = this.props;
    const template = "{{name}}";

    return  this.compile(template, this.props);

  }
}

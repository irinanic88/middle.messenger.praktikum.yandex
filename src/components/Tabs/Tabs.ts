import template from './Tabs.hbs?raw';
import SignInTemplate from './SignIn.hbs?raw';
import SignUpTemplate from './SignUp.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';
import ButtonTemplate from '../../partials/Button.hbs?raw';
import Block from "../../core/Block";
import Handlebars from 'handlebars';
import './Tabs.css';
import '../../assets/styles/new/Form.css';
import '../../assets/styles/new/TextInput.css';
import '../../assets/styles/new/Button.css';

Handlebars.registerPartial('SignIn', SignInTemplate);
Handlebars.registerPartial('SignUp', SignUpTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);
Handlebars.registerPartial('Button', ButtonTemplate);

export class Tabs extends Block {
  constructor(props) {
    super(props);
  }

  render(): string {
    return template;
  }
}



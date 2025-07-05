import Block from "../core/Block";
import {render} from "../utils/helpers";
import ErrorPageTemplate from '../partials/ErrorPage.hbs?raw';
import '../assets/styles/ErrorPage.css';
import Handlebars from 'handlebars';
import {Auth} from "./Auth/Auth";

Handlebars.registerPartial('ErrorPage', ErrorPageTemplate);

const template = `
<div class="app">
  {{{AuthPage}}}
  
  {{#if isUserError }}
    {{>ErrorPage img="../../../public/icons/page-not-found_icon.png" text="Page not found"}}
  {{/if}}
  
  {{#if isServerError}}
    {{>ErrorPage img="../../../public/icons/server-error_icon.png" text="Server error"}}
  {{/if}}
</div>
`;

class App extends Block {
  constructor(props) {
    super( {
      isUserError: false,
      isServerError: false,
      AuthPage: new Auth({
        activeTab: 'signIn',
      }),
    });

  }

  render(): string {
    return template;
  }
}

const app = new App({});

render('#app', app);




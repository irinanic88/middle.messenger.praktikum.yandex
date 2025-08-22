import { userMock } from '../mocks';
import Block from './core/Block';
import { Auth } from './pages/Auth/Auth';
import { Chats } from './pages/Chats/Chats';
import { Error } from './pages/Error/Error';
import { render } from './utils/helpers';

import './pages/Error/Error.css';
import './pages/Auth/Auth.css';
import './assets/styles/Form.css';
import './components/TextInput/TextInput.css';
import './components/Button/Button.css';
import './pages/Chats/Chats.css';
import './components/Chat/Chat.css';
import './components/Avatar/Avatar.css';
import './components/Message/Message.css';
import './components/MessageInput/MessageInput.css';
import './assets/styles/Grid.css';
import './components/EditContactDialog/EditContactDialog.css';
import './components/Link/Link.css';
import './components/Contact/Contact.css';
import './assets/styles/Dialog.css';
import './components/ProfileDialog/ProfileDialog.css';
import './components/Alert/Alert.css';
import './components/UploadImageInput/UploadImageInput.css';

const template = `
<div class="app">
  {{#if (not isAuthorized) }}
    {{{AuthPage}}}
  {{/if}}
  {{#if isAuthorized }}
    {{{Chats}}}
  {{/if}}

  {{#if isUserError }}
    {{{PageNotFound}}}
  {{/if}}

  {{#if isServerError}}
    {{{ServerError}}}
  {{/if}}
</div>
`;

class App extends Block {
  constructor() {
    super({
      AuthPage: new Auth({
        activeTab: 'signIn',
        onAuthSubmit: () => this.setProps({ isAuthorized: true }),
      }),
      Chats: new Chats({ user: userMock }),
      PageNotFound: new Error({ error: 'pageNotFound' }),
      ServerError: new Error({ error: 'serverError' }),
      isAuthorized: false,
      isServerError: false,
      isUserError: false,
    });
  }

  render(): string {
    return template;
  }
}

const app = new App();

app.dispatchComponentDidMount();

render('#app', app);

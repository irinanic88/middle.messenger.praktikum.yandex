import Block from "../../core/Block";
import { render} from "../../utils/helpers";
import '../../assets/styles/new/Grid.css';
import './Chats.css';
import '../../assets/styles/new/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import ButtonTemplate from '../../partials/Button.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';
import ContactTemplate from '../../partials/Contact.hbs?raw';

import '../../assets/styles/new/Avatar.css';
import '../../assets/styles/new/Button.css';
import '../../assets/styles/new/TextInput.css';
import '../../assets/styles/new/Contact.css';
import '../../components/Chat/Chat.css';

import {generateContacts} from "../../../mocks";
import {Chat} from "../../components/Chat/Chat";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('Button', ButtonTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);
Handlebars.registerPartial('Contact', ContactTemplate);

const template = `
  <div class="grid">
    <header class="sidebar__header chats__header">
      {{> Avatar src="/icons/cat_icon_1.png" altText="profile-avatar" classes="avatar__profile"}}
      <div class="chats__profile">
      <div>
        <span class="chats__name">{{name}}</span>
        <span class="chats__user-name">{{userName}}</span>
      </div>
        {{> Button title="Profile Info"}}
      </div>
    </header>

    <aside class="sidebar__body chats__list">
      <div class="chats__search">
        {{> TextInput id="search" type="text" required='false' placeholder="Search by #tag or @username"}}
        {{> Button icon="/icons/search_icon.png" }}
      </div>
      <ul>
      {{#each contacts}}
        {{> Contact avatar=avatar name=name chatName=chatName userName=userName tags=tags }}
      {{/each}}
      </ul>
    </aside>

    {{{CurrentChat}}} 
  
  </div>
`;

class Chats extends Block {
  constructor(props) {
    super({
      ...props,
      CurrentChat: new Chat({
        contact: props.contacts[0],
        userName: props.name,
      })
    });
  }

  render(): string {
    return template;
  }
}
const chats = new Chats({name: "Irina", userName: '@chat_owner', contacts: generateContacts(16)});

render('#chats', chats);




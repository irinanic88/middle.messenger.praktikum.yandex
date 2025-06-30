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

import {contactsMock, userMock} from "../../../mocks";
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
        <p class="chats__name">{{name}} {{surname}}</p>
        <p class="chats__user-name">{{userName}}</p>
        {{> Button title="Profile Info" class="button_secondary chats__profile-btn"}}
      </div>
    </header>

    <aside class="sidebar__body chats__list">
      <div class="chats__search">
        {{> TextInput id="search" type="text" required='false' placeholder="Search by #tag or @username" fullWidth="true"}}
        {{> Button icon="/icons/search_icon.png" }}
      </div>
      <ul>
      {{#each contacts}}
        {{> Contact 
        avatar=avatar 
        name=name 
        chatName=chatName 
        userName=userName 
        tags=tags 
        selected=(eq chatId ../selectedChat)
        }}
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
      name: props.user.name,
      surname: props.user.surname,
      userName: props.user.userName,
      selectedChat: props.contacts[0].chatId,
      CurrentChat: new Chat({
        contactId: props.contacts[0].chatId,
        user: props.user,
      })
    });
  }

  render(): string {
    return template;
  }
}
const chats = new Chats({user: userMock, contacts: contactsMock});

render('#chats', chats);




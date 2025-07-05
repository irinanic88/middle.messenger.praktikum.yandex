import Block from "../../core/Block";
import { render} from "../../utils/helpers";
import '../../assets/styles/Grid.css';
import './Chats.css';
import '../../assets/styles/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';
import ContactTemplate from '../../partials/Contact.hbs?raw';

import '../../assets/styles/Avatar.css';
import '../../assets/styles/TextInput.css';
import '../../assets/styles/Contact.css';
import '../../components/ProfileDialog/ProfileDialog.css';
import '../../components/Chat/Chat.css';

import {contactsMock, userMock} from "../../../mocks";
import {Chat} from "../../components/Chat/Chat";
import {Button} from "../../components/Button/Button";
import ProfileDialog from "../../components/ProfileDialog/ProfileDialog";
import {ChatsPropsType} from "./Chats.types";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);
Handlebars.registerPartial('Contact', ContactTemplate);

const template = `
  <div class="grid">
    <header class="sidebar__header chats__header">
      {{> Avatar src="/icons/cat_icon_1.png" altText="profile-avatar" classes="avatar__profile"}}
      <div class="chats__profile">
        <p class="chats__name">{{name}} {{surname}}</p>
        <p class="chats__user-name">{{userName}}</p>
        {{{ProfileButton}}}
      </div>
    </header>

    <aside class="sidebar__body chats__list">
      <div class="chats__search">
        {{> TextInput id="search" type="text" required='false' placeholder="Search by #tag or @username" fullWidth="true"}}
        {{{SearchButton}}}
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
  
    {{#if showProfileDialog}}
      {{{ProfileDialog}}}
    {{/if}}
  </div>
`;

class Chats extends Block<ChatsPropsType> {
  constructor(props) {
    super({
      ...props,
      name: props.user.name,
      surname: props.user.surname,
      userName: props.user.userName,
      selectedChat: props.contacts[7].chatId,
      showProfileDialog: false,
      CurrentChat: new Chat({
        contactId: props.contacts[7].chatId,
        user: props.user,
      }),
      ProfileButton: new Button({
        title:"Profile Info",
        classList:["button_secondary", "chats__profile-btn"],
        onClick: () => this.handleShowProfileDialog(true),
      }),
      SearchButton: new Button({
        icon: "/icons/search_icon.png",
      }),
      ProfileDialog: new ProfileDialog({
        user: props.user,
        closeDialog: () => this.handleShowProfileDialog(false),
      })
    });
  }

  render(): string {
    return template;
  }

  handleShowProfileDialog(val: boolean) {
    console.log('Click called with', val);
    this.setProps({showProfileDialog: val});
  }
}
const chats = new Chats({user: userMock, contacts: contactsMock});

render('#chats', chats);




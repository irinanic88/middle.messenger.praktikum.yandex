import Block from "../../core/Block";

import '../../assets/styles/new/Grid.css';
import './Chat.css';
import '../../assets/styles/new/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import MessageTemplate from '../../partials/Message.hbs?raw';
import ButtonTemplate from '../../partials/Button.hbs?raw';

import '../../assets/styles/new/Avatar.css';
import '../../assets/styles/new/Message.css';
import '../../assets/styles/new/Button.css';
import '../../assets/styles/new/CurrentMessage.css';

import {contactsMock, generateMessages} from "../../../mocks";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('Message', MessageTemplate);
Handlebars.registerPartial('Button', ButtonTemplate);

const template = `
  <main class="main">
    <header class="main__header chat__header">
      <div class="chat__info">
        <p class="chat__name">{{chatName}}</p>
        <p class="chat__users">{{userName}} &amp; {{contactName}}</p>
        <div class="chat__tags">
        {{#each tags}}
          <span class="chat__tag">#{{this}}</span>
        {{/each}}
        </div>
      </div>
      {{> Button icon="/icons/edit_icon.png" }}
    </header>      
      
    <div class="main__body">
      <ul class="chat__messages">
        {{#each messages}}
          {{> Message 
            avatar=avatar 
            text=text 
            owner=(eq senderId ../userId) 
            contact=(not (eq senderId ../userId))
          }}
        {{/each}}
      </ul>
    </div>
  
    <div class="main__footer chat__current-message">
      <form class="current-message__form" name="message_form">
        <label class="current-message__label" for="message">
          <textarea 
          class="current-message__input" 
          rows="1" 
          id="message" 
          name="message" 
          maxlength="500"
          placeholder="Type your message here"
          ></textarea>
        </label>
        {{> Button title="Send" }}
      </form>
    </main>
`;

const getContactById = (id, contacts) => {
  const contact = contacts.find(c => c.chatId === id);

  return contact || {
    name: '',
    chatName: '',
    tags: [],
  }
}

export class Chat extends Block {
  constructor(props) {
    const {name: contactName, chatName, tags} = getContactById(props.contactId, contactsMock);

    super({
      ...props,
      userId: props.user.id,
      userName: `${props.user.name} ${props.user.surname}`,
      messages: generateMessages({chatId: props.contactId}),
      contactName,
      chatName,
      tags,
    });
  }

  render(): string {
    return template;
  }
}




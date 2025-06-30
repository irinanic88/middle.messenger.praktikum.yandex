import Block from "../../core/Block";

import '../../assets/styles/new/Grid.css';
import './Chat.css';
import '../../assets/styles/new/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import MessageTemplate from '../../partials/Message.hbs?raw';

import '../../assets/styles/new/Avatar.css';
import '../../assets/styles/new/Message.css';

import { generateMessages } from "../../../mocks";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('Message', MessageTemplate);

const template = `
  <main class="main">
    <header class="main__header chat__header">
      <p class="chat__name">Polarised impactful software</p>
      <p class="chat__users">{{name}} and Claudia Mitchell</p>
      <div class="chat__tags">
        <span class="chat__tag">#art</span>
        <span class="chat__tag">#history</span>
      </div>
    </header>      
      
    <div class="main__body">
      <ul class="chat__messages">
        {{#each messages}}
          {{> Message 
            avatar=avatar 
            text=text 
            owner=(eq senderId ../currentUserId) 
            contact=(not (eq senderId ../currentUserId))
          }}
        {{/each}}
      </ul>
    </div>
  
    <div class="main__footer">
    </div>
    </main>
`;

export class Chat extends Block {
  constructor(props) {
    super({
      ...props,
      name: props.userName,
      messages: generateMessages(),
      currentUserId: 'u1',
    });
  }

  render(): string {
    return template;
  }
}




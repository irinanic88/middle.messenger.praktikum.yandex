import Block from "../../core/Block";
import { render} from "../../utils/helpers";
import '../../assets/styles/new/Grid.css';
import './Chats.css';
import '../../assets/styles/new/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import ButtonTemplate from '../../partials/Button.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';
import '../../assets/styles/new/Avatar.css';
import '../../assets/styles/new/Button.css';
import '../../assets/styles/new/TextInput.css';

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('Button', ButtonTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);

const template = `
  <div class="grid">
    <header class="sidebar__header chats__header">
      {{> Avatar src="../../assets/icons/cat_icon_1.png" altText="profile-avatar" classes="avatar__profile"}}
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
      </div>
      <ul>
     
      <li class="contact">
        {{> Avatar src="../../assets/icons/cat_icon_2.png" altText="contact-avatar" classes="avatar__contact"}}
        <div class="contact__body">
          <p class="contact__chat-name">chatName</p>
          <p class="contact__name">name</p>
          <p class="contact__user-name">@userName</p>
          <p class="contact__tags"><span>#tags</span></p>
        </div>
      </li>

      </ul>
    </aside>
    <main class="main">
      <header class="main__body">
      </header>
  
      <app class="main__footer">
      </app>
    </main>
  </div>
`;

class Chats extends Block {
  constructor(props) {
    super( props);

  }



  render(): string {
    return template;
  }
}

const chats = new Chats({name: "Irina", userName: '@chat_owner'});

render('#chats', chats);




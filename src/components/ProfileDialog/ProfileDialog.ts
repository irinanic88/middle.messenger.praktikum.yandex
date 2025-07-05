import Block from "../../core/Block";
import '../../assets/styles/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';

import '../../assets/styles/Avatar.css';
import '../../assets/styles/TextInput.css';
import '../../assets/styles/Form.css';
import '../../assets/styles/Dialog.css';
import './ProfileDialog.css';

import { Button } from "../Button/Button";
import EditProfile from "./EditProfile";
import {ProfileDialogProps} from "./ProfileDialog.types";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);

const template = `
  <main class="dialog">
    <div class="dialog__container">
      {{#if (not isEdit)}}
        <div class="profile-dialog__profile">
          {{> Avatar src="/icons/cat_icon_1.png" altText="avatar" classes="avatar__big"}}
          <div class="profile-dialog__body">
            <ul class="profile-dialog__profile-info">
              <li><span>First name:</span><span>{{name}}</span></li>
              <li><span>Surname:</span><span>{{surname}}</span></li>
              <li><span>Email:</span><span>{{email}}</span></li>
              <li><span>Phone number:</span><span>{{phone}}</span></li>
              <li><span>Login:</span><span>{{login}}</span></li>
            </ul>
          </div>
        </div>
        {{{EditButton}}}
      {{/if}}

      {{#if isEdit}}
        {{{EditProfile}}}
      {{/if}}
      
      {{{CloseButton}}}
    </div>
  </main>         
`;

export default class ProfileDialog extends Block<ProfileDialogProps> {
  constructor(props) {
    super({
      ...props,
      name: props.user.name,
      surname: props.user.surname,
      email: props.user.email,
      phone: props.user.phone,
      login: props.user.userName,
      password: props.user.password,
      isEdit: false,
      EditButton: new Button({
        title:"Edit",
        classList:["profile-dialog__action-btn"],
        onClick: () => this.editUserProfile(true),
      }),
      CloseButton: new Button({
        icon: "/icons/close_icon.png",
        onClick: () => {
          props.closeDialog();
          this.editUserProfile(false);
        },
        classList: ['dialog__close-btn'],
      }),
      EditProfile: new EditProfile({
        user: props.user,
        closeDialog: () => props.closeDialog(),
      })
    });
  }

  render(): string {
    return template;
  }

  editUserProfile(v: boolean) {
    this.setProps({isEdit: v});
  }
}




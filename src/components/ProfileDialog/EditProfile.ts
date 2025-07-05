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
import {EditProfileProps} from "./ProfileDialog.types";

Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);

const template = `
  <div class="profile-dialog__edit-container">
    <div class="profile-dialog__profile">
      <div class="profile-dialog__header">
        {{#if (not isDrawing)}}
          {{> Avatar src=form.avatar altText="avatar" classes="avatar__big"}}
          {{{DrawAvatarButton}}}
        {{/if}}
        
        {{#if isDrawing}}
          <canvas class="profile-dialog__edit-avatar" id="avatar-canvas" width="230px" height="230px"></canvas>
          <div class="profile-dialog__edit-avatar-actions">
            {{{ClearCanvasButton}}}
            {{{BackButton}}}
            {{{SaveAvatarButton}}}
          </div>
        {{/if}}
      </div>
      <div class="profile-dialog__body">
        <div class="form__inputs profile-dialog__form">
          {{> TextInput id="first_name" label="First name" required="true" type="text" placeholder="" value=form.name}}
          {{> TextInput id="second_name" label="Surname" required="true" type="text" placeholder="" value=form.surname }}
          {{> TextInput id="email" label="Email" required="true" type="text" placeholder="" value=form.email }}
          {{> TextInput id="phone" label="Phone number" required="true" type="text" placeholder="" value=form.phone }}
          {{> TextInput id="password" label="Password" required="true" type="password" placeholder="(your secret password)" value=form.password }}
        </div>
      </div>
    </div>
    
    <div class="profile-dialog__actions">
    
    {{{SaveButton}}}
    </div>
  </div>
`;

export default class EditProfile extends Block<EditProfileProps> {
  constructor(props) {
    super({
      ...props,
      isDrawing: false,
      form: {
        avatar: props.user.avatar,
        name: props.user.name,
        surname: props.user.surname,
        email: props.user.email,
        phone: props.user.phone,
        login: props.user.userName,
        password: props.user.password,
      },
      DrawAvatarButton: new Button({
        title:"Draw new avatar",
        classList:["button_secondary"],
        onClick: () => this.enableCanvas(),
      }),
      SaveAvatarButton: new Button({
        title: 'Save avatar',
        classList:["button_secondary"],
        onClick: () => this.saveAvatar(),
      }),
      ClearCanvasButton: new Button({
        title: "Clear canvas",
        classList: ["button_secondary"],
        onClick: () => this.clearCanvas(),
      }),
      BackButton: new Button({
        title:"Go back",
        classList:["button_secondary"],
        onClick: () => {
          this.setProps({isDrawing: false})
        },
      }),
      SaveButton: new Button({
        title:"Save changes",
        classList:["profile-dialog__action-btn"],
        onClick: () => {
          props.closeDialog();
        },
      }),
    });
  }

  render(): string {
    return template;
  }

  // Большое спасибо чату GPT за помощь в написании этого метода
  enableCanvas() {
    this.setProps({ isDrawing: true });

    setTimeout(() => {
      const canvas = document.getElementById('avatar-canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let drawing = false;

      canvas.onmousedown = () => (drawing = true);
      canvas.onmouseup = () => {
        drawing = false;
        ctx.beginPath();
      };
      canvas.onmouseout = () => {
        drawing = false;
        ctx.beginPath();
      };
      canvas.onmousemove = (e) => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'black';

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      };
    }, 0);
  }

  // Еще одно спасибо чату GPT за помощь в написании этого метода тоже
  clearCanvas() {
    const canvas = document.getElementById('avatar-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  saveAvatar() {
    const canvas = document.getElementById('avatar-canvas') as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL('image/png');

    this.setProps({
      form: {
      ...this.props.form,
      avatar: dataUrl
    },
      isDrawing: false,
    });
  }
}




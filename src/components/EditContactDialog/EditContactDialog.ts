import Block from "../../core/Block";
import '../../assets/styles/Grid.css';
import './EditContactDialog.css';
import '../../assets/styles/Avatar.css';
import Handlebars from 'handlebars';
import AvatarTemplate from '../../partials/Avatar.hbs?raw';
import TextInputTemplate from '../../partials/TextInput.hbs?raw';

import {Button} from "../Button/Button";
import {contactsMock} from "../../../mocks";
import {EditContactDialogPropsType} from "./EditContactDialog.types";
import {Contact} from "../Chat/Chat.types";
import {emptyContact} from "../../utils/constants";


Handlebars.registerPartial('Avatar', AvatarTemplate);
Handlebars.registerPartial('TextInput', TextInputTemplate);

const template = `
    <main class="dialog">
      <div class="edit-contact-dialog__container">
      <div class="edit-contact-dialog__avatars">
        {{> Avatar src=user.avatar altText="user-avatar" classes="avatar__profile"}}
        {{> Avatar src=contact.avatar altText="contact-avatar" classes="avatar__profile"}}
      </div>
      <div class="form__inputs edit-contact-dialog__form">
        <p class="edit-contact-dialog__tags-label">Your chat is called:</p>
        {{> TextInput id="chat_name" type="text" placeholder="" value=contact.chatName fullWidth=true }}
        
        <p class="edit-contact-dialog__tags-label">Add tags for this chat (max.3):</p>
        {{> TextInput id="tag_1" label="#" type="text" placeholder="" value=(or tags.tag_1 "")}}
        {{> TextInput id="tag_2" label="#" type="text" placeholder="" value=(or tags.tag_2 "")}}
        {{> TextInput id="tag_3" label="#" type="text" placeholder="" value=(or tags.tag_3 "")}}
      </div> 
      {{{SaveButton}}}
      {{{CloseButton}}}
      </div>
    </main>    
`;

export class EditContactDialog extends Block<EditContactDialogPropsType> {
  constructor(props) {
    const contact: Contact = contactsMock.find(contact => contact.chatId === props.contactId) || emptyContact;

    super({
      ...props,
      contact,
      user: props.user,
      CloseButton: new Button({
        icon: "/icons/close_icon.png",
        onClick: () => {
          props.closeDialog();
        },
        classList: ['dialog__close-btn'],
      }),
      tags: {
        tag_1: contact.tags[0],
        tag_2: contact.tags[1],
        tag_3: contact.tags[2],
      },
      SaveButton: new Button({
        title: "Save changes",
        onClick: () => {
          props.closeDialog();
        },
        classList:['edit-contact-dialog_action-btn'],
      }),
    });
  }

  render(): string {
    return template;
  }
}





import Block from '../../core/Block';
import { Form } from '../../core/Form';
import { ContactType, UserType } from '../../types/api.types';
import { FormType } from '../../types/common.types';
import { EditContactDialogPropsType } from '../../types/componentProps.types';
import {
  defaultChatName,
  emptyContact,
} from '../../utils/constants';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';

const template = `
    <main class="dialog">
      <div class="edit-contact-dialog__container">
        <div class="edit-contact-dialog__body">
          <div class="edit-contact-dialog__avatars">
            {{{AvatarOwner}}}
            {{{AvatarContact}}}
          </div>

          <div class="form__inputs edit-contact-dialog__form">
            {{{EditForm}}}
          </div>
          {{{CloseButton}}}
        </div>
      </div>
    </main>
`;

export class EditContactDialog extends Block<EditContactDialogPropsType> {
  constructor(props: {
    user: UserType,
    contactId: string,
    closeDialog: () => void,
  }) {
    const contact: ContactType = props.user.contacts.find((c) => c.chatId === props.contactId) || emptyContact;
    const tags = Array.from({ length: 3 }, (_, i) => contact.tags?.[i] ?? '');

    const initialForm = { chat_name: contact.chatName || defaultChatName, tags };

    super({
      ...props,
      AvatarContact: new Avatar({
        classList: ['avatar__profile'],
        isUser: false,
        src: contact.avatar,
      }),
      AvatarOwner: new Avatar({
        classList: ['avatar__profile'],
        isUser: true,
        src: props.user.avatar,
      }),
      CloseButton: new Button({
        classList: ['dialog__close-btn'],
        iconSolo: '/icons/close_icon.png',
        onClick: () => {
          props.closeDialog();
        },
      }),
      EditForm: new Form({
        formName: 'edit-contact-form',
        initialForm,
        onSubmit: (form: FormType) => {
          console.log('EDIT CONTACT form submitted', form);
          props.closeDialog();
        },
        submitButton: { classList: ['edit-contact-dialog_action-btn'], title: 'Save changes' },
      }),
      contact,
    });
  }

  render(): string {
    return template;
  }
}

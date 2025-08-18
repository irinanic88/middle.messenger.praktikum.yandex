import { messagesDictMock } from '../../../mocks';
import Block from '../../core/Block';
import { UserType } from '../../types/api.types';
import { ChatPropsType } from '../../types/componentProps.types';
import { getContactById } from '../../utils/helpers';
import { Button } from '../Button/Button';
import { EditContactDialog } from '../EditContactDialog/EditContactDialog';
import { Message } from '../Message/Message';
import { MessageInput } from '../MessageInput/MessageInput';

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
      {{{EditContactButton}}}
    </header>

    <div class="main__body">
      <ul id="messages"  class="chat__messages">
        {{#each messagesKeys}}
          {{{lookup ../this this}}}
        {{/each}}
      </ul>
    </div>

    <div class="main__footer">
      {{{MessageInput}}}

      {{#if showEditContactDialog}}
        {{{EditContactDialog}}}
      {{/if}}
    </main>
`;

export class Chat extends Block<ChatPropsType> {
  constructor(props: {
    contactId: string,
    user: UserType,
  }) {
    const {
      contactId,
      user: {
        avatar: userAvatar, contacts, first_name, second_name, id,
      },
    } = props;

    const {
      name: contactName,
      chatName = 'Miau chat',
      tags = [],
      avatar: contactAvatar,
    } = getContactById(contactId, contacts);

    const fetchedMessages = messagesDictMock[props.contactId];
    const messages = fetchedMessages.reduce((acc, message) => ({
      ...acc,
      [message.messageId]: new Message({
        contactAvatar,
        message,
        userAvatar,
        userId: id,
      }),
    }), {});
    const messagesKeys = Object.keys(messages);

    super({
      ...props,
      ...messages,
      EditContactButton: new Button({
        iconEnd: '/icons/edit_icon.png',
        onClick: () => this.handleShowEditContactDialog(true),
        title: 'Edit contact',
      }),
      EditContactDialog: new EditContactDialog({
        closeDialog: () => this.handleShowEditContactDialog(false),
        contactId: props.contactId,
        user: props.user,
      }),
      MessageInput: new MessageInput(),
      chatName,
      contactName,
      fetchedMessages,
      messagesKeys,
      showEditContactDialog: false,
      tags,
      userName: `${first_name} ${second_name}`,
    });
  }

  render(): string {
    return template;
  }

  protected afterRender(): void {
    super.afterRender();
    const messagesBox = document.getElementById('messages');

    if (messagesBox) {
      setTimeout(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }, 0);
    }
  }

  handleShowEditContactDialog(v: boolean) {
    this.setProps({ showEditContactDialog: v });
  }
}

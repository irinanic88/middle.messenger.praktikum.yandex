import Block from '../../core/Block';
import { MessageType } from '../../types/api.types';
import { Avatar } from '../Avatar/Avatar';

const template = `
<li class="message">
  {{{Avatar}}}
  <p>{{text}}</p>
</li>
`;

export class Message extends Block {
  constructor(props: {
    message: MessageType,
    userId: string,
    userAvatar?: string,
    contactAvatar?: string,
  }) {
    const {
      message, userId, userAvatar, contactAvatar,
    } = props;

    const isOwnersMessage = message.senderId === userId;
    const src = isOwnersMessage ? contactAvatar : userAvatar;

    super({
      ...props,
      Avatar: new Avatar({
        classList: ['avatar__chat'],
        isUser: isOwnersMessage,
        src,
      }),
      classList: isOwnersMessage ? ['message__chat-owner'] : ['message__contact'],
      text: message.text,
    });
  }

  render(): string {
    return template;
  }
}

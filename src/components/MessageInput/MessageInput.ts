import Block from '../../core/Block';
import { Validator } from '../../core/Validator';
import { MessageInputPropsType } from '../../types/componentProps.types';
import { Button } from '../Button/Button';

const template = `
  <form class="current-message" name="message-form">
    <label class="current-message__label" for="message">
      <textarea
      class="current-message__input"
      rows="1"
      id="message"
      name="message"
      maxlength="500"
      placeholder="Type your message here"
      >{{currentMessage}}</textarea>
    </label>
    {{{SendMessage}}}
  </form>
`;

export class MessageInput extends Block<MessageInputPropsType> {
  constructor() {
    super({
      SendMessage: new Button({
        onClick: () => this.handleSendMessage(),
        title: 'Send',
        type: 'submit',
      }),
      currentMessage: '',
      events: {
        input: (e: Event) => {
          const target = e.target as HTMLTextAreaElement;

          this.setProps({ currentMessage: target.value });

          const isValid = !Array.isArray(Validator.message(this.props.currentMessage));

          if(isValid) {
            this.children.SendMessage.show();
          } else {
            this.children.SendMessage.hide();
          }
        }
      },
    });
  }

  render(): string {
    return template;
  }

  protected componentDidMount() {
    super.componentDidMount();

    this.children.SendMessage.hide();
  }

  handleSendMessage() {

    console.log('MESSAGE sent', this.props.currentMessage);

    this.setProps({ currentMessage: '' });

    const textarea = this.element?.querySelector('textarea');

    if (textarea) textarea.value = '';

  }
}

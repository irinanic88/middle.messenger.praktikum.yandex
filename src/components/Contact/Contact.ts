import Block from '../../core/Block';
import { UserType } from '../../types/api.types';
import { ContactPropsType } from '../../types/componentProps.types';
import { generateContactTags } from '../../utils/helpers';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';

const template = `
<li class="contact">
  <div class="contact__container">
    <div class="contact__body">
      <p class="contact__chatName"><span class="contact__title">Chat: </span>{{contact.chatName}}</p>
      <p class="contact__name"><span class="contact__title">With: </span>{{contact.name}}</p>
      <p class="contact__userName">@{{contact.userName}}</p>
      <div class="contact__tags">
        {{#each tagsKeys}}
          {{{lookup ../this this}}}
        {{/each}}
      </div>
    </div>
    <div class="contact__aside">
      {{{Avatar}}}
      {{{SelectButton}}}
    </div>
  </div>
  <div class="contact__divider"></div>
</li>
`;

export class Contact extends Block<ContactPropsType> {
  constructor(props: {
    user: UserType,
    setSearchValue: (v: string) => void,
    id: string,
    isSelected?: boolean,
    events?: {
      click: () => void,
    }
  }) {
    const contact = props.user.contacts.find((c) => c.chatId === props.id) || props.user.contacts[0];
    const tags = generateContactTags(contact?.tags || [] , props.setSearchValue);
    const tagsKeys = Object.keys(tags);

    super({
      ...props,
      ...tags,
      Avatar: new Avatar({
        classList: ['avatar__contact'],
        isUser: false,
        src: contact.avatar,
      }),
      SelectButton: new Button({
        classList: props.isSelected ? ['button_contact', 'button_contact__selected'] : ['button_contact'],
        iconSolo: '/icons/arrow_icon.png',
        onClick: () => {},
      }),
      classList: props.isSelected ? ['contact__selected'] : [],
      contact,
      tagsKeys,
    });
  }

  render(): string {
    return template;
  }
}

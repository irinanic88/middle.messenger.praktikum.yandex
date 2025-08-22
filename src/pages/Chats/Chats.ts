import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Chat } from '../../components/Chat/Chat';
import { ContactsList } from '../../components/ContactsList/ContactsList';
import ProfileDialog from '../../components/ProfileDialog/ProfileDialog';
import Block from '../../core/Block';
import { UserType } from '../../types/api.types';
import { ChatsPropsType } from '../../types/componentProps.types';

const template = `
  <div class="grid">
    <header class="sidebar__header chats__header">
      <div class="chats__avatar">
        {{{Avatar}}}
      </div>
      <div class="chats__profile">
        <p class="chats__name">{{first_name}} {{second_name}}</p>
        <p class="chats__user-name">{{display_name}}</p>
        {{{ProfileButton}}}
      </div>
    </header>

    {{{ContactsList}}}

    {{{CurrentChat}}}

    {{#if showProfileDialog}}
      {{{ProfileDialog}}}
    {{/if}}
  </div>
`;

export class Chats extends Block<ChatsPropsType> {
  constructor(props: { user: UserType }) {
    const {
      first_name, second_name, display_name, login, contacts, avatar,
    } = props.user;

    super({
      ...props,
      Avatar: new Avatar({
        classList: ['avatar__profile'],
        isUser: true,
        src: avatar,
      }),
      ContactsList: new ContactsList({
        selectedChat: contacts[0].chatId,
        setSelectedChat: (id: string) => this.setProps({ selectedChat: id }),
        user: props.user,
      }),
      CurrentChat: new Chat({
        contactId: contacts[0].chatId,
        user: props.user,
      }),
      ProfileButton: new Button({
        classList: ['chats__profile-btn'],
        iconEnd: '/icons/eye_icon.png',
        onClick: () => this.handleShowProfileDialog(true),
        title: 'View profile Info',
      }),
      ProfileDialog: new ProfileDialog({
        closeDialog: () => this.handleShowProfileDialog(false),
        user: props.user,
      }),

      display_name,
      first_name,
      login,
      second_name,
      selectedChat: contacts[0].chatId,
      showProfileDialog: false,
    });
  }

  render(): string {
    return template;
  }

  protected componentDidUpdate(oldProps: ChatsPropsType, newProps: ChatsPropsType): boolean {
    if (oldProps.selectedChat !== newProps.selectedChat) {
      this.children.ContactsList = new ContactsList({
        selectedChat: newProps.selectedChat,
        setSelectedChat: (id: string) => this.setProps({ selectedChat: id }),
        user: this.props.user,
      });
      this.children.CurrentChat = new Chat({
        contactId: newProps.selectedChat,
        user: this.props.user,
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  handleShowProfileDialog(value: boolean) {
    this.setProps({ showProfileDialog: value });
  }
}

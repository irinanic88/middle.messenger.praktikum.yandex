import Block from '../../core/Block';
import { UserType } from '../../types/api.types';
import { ContactPropsType, ContactsListPropType } from '../../types/componentProps.types';
import { Button } from '../Button/Button';
import { Contact } from '../Contact/Contact';
import { TextInput } from '../TextInput/TextInput';

const template = `
  <aside class="sidebar__body chats__list">
    <form class="chats__search" name="search-form">
      {{{ Search }}}
      {{{ClearButton}}}
      {{{SearchButton}}}
    </form>
    <ul>
    {{#each contacts}}
      {{{lookup ../this this}}}
    {{/each}}
    </ul>
  </aside>
`;

export class ContactsList extends Block<ContactsListPropType> {
  private form: { search: string };
  constructor(props: {
    user: UserType,
    selectedChat: string,
    setSelectedChat: (id: string) => void}) {
    const { user, selectedChat, setSelectedChat } = props;
    const handleSearchChange = (value: string) => {
      this.form.search = value;
      this.children.Search.setProps({ value });
    };

    const contactBlocks: Record<string, Block<ContactPropsType>> = props.user.contacts.reduce(
      (acc, { chatId: id }) => ({
        ...acc,
        [id]: new Contact({
          events: {
            click: () => setSelectedChat(id),
          },
          id,
          isSelected: id === selectedChat,
          setSearchValue: (value: string) => this.changeSearchValue(value),
          user,
        }) as Block<ContactPropsType>,
      }),
      {}
    );

    super({
      ...props,
      ...contactBlocks,
      ClearButton: new Button({
        iconSolo: '/icons/close_icon.png',
        onClick: () => this.changeSearchValue(''),
      }),
      Search: new TextInput({
        fullWidth: true,
        id: 'search',
        onChange: (v: string) => handleSearchChange(v),
        placeholder: 'Search by #tag',
        type: 'text',
      }),
      SearchButton: new Button({
        iconSolo: '/icons/search_icon.png',
        onClick: () => this.handleSearchClick(),
        type: 'submit',
      }),
      contacts: Object.keys(contactBlocks),
    });

    this.form = { search: '' };
  }

  render(): string {
    return template;
  }

  changeSearchValue(value: string) {
    this.form.search = value;
    this.children.Search.setProps({ value });
  }

  handleSearchClick() {
    if (this.form.search.length > 0) {
      console.log('SEARCH form submitted', this.form);

      this.changeSearchValue('');
    }
  }
}

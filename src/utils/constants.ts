import {TabsType} from "../components/Tabs/Tabs.types";
import {Contact} from "../components/Chat/Chat.types";

export const appTabs: TabsType = {
  signIn: {
    id: 'signIn',
    title: 'Sign In',
    href: '#',
  },
  signUp: {
    id: 'signUp',
    title: 'Sign Up',
    href: '#',
  },
};

export const emptyContact: Contact = {
  chatId: '',
  avatar: '',
  chatName: '',
  name: '',
  userName: '',
  tags: [],
};

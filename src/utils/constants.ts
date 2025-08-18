import { ContactType } from '../types/api.types';

export const HTTP_METHODS = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
} as const;
export const textInputsDict = {
  chat_name: 'Chat name',
  display_name: 'Display name',
  email: 'Email',
  first_name: 'First name',
  login: 'Login',
  newPassword: 'New password',
  oldPassword: 'Old password',
  password: 'Password',
  phone: 'Phone',
  second_name: 'Second name',
  tags_1: '#',
  tags_2: '#',
  tags_3: '#',
};

export  const passwordInputs = ['password', 'oldPassword', 'newPassword'];

export const emptyContact: ContactType = {
  avatar: '',
  chatId: '',
  chatName: '',
  name: '',
  tags: [],
  userName: '',
};

export const initialFormSignIn = {
  login: '',
  password: '',
};

export const initialFormSignUp = {
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  password: '',
  email: '',
  phone: '',
};

export const initialFormEditProfile = {
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
};

export const defaultChatName = 'A chat with boring name';

export const errorsDict = {
  pageNotFound: {
    img: '../../../public/icons/page-not-found_icon.png',
    text: 'Page not found',
  },
  serverError: {
    img: '../../../public/icons/server-error_icon.png',
    text: 'Server error',
  },
};

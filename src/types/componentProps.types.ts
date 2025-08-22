import { ContactType, UserType } from './api.types';
import { FormProps } from './common.types';
import Block from '../core/Block';

export type LinkPropsType = {
  events: {
    click: (event: Event) => void;
  };
};

export type ButtonProps = {
  iconEnd?: string,
  iconSize?: string,
  iconSolo?: string,
  iconStart?: string,
  isTag?: boolean,
  type?: 'button' | 'submit',
  classList?: string[],
  onClick: () => void,
  title?: string,
  disabled?: boolean,
}

export type AvatarPropsType = {altText: string, classList?: string[], src?: string};

export type ButtonPropsType = {
  type?: string,
  iconSolo?: string;
  isTag?: boolean;
  iconSize?: string;
  iconStart?: string;
  iconEnd?: string;
  title?: string;
  events: { click: (event: Event) => void },
  classList?: string[];
  disabled?: boolean;
};

export type EditContactDialogPropsType = {
  contact: ContactType;
  EditForm: Block<FormProps>;
  CloseButton: Block<ButtonPropsType>;
  AvatarContact: Block<AvatarPropsType>;
  AvatarOwner:Block<AvatarPropsType>;
};

export type MessageInputPropsType = {
  currentMessage: string,
  events: {
    input: (event: Event) => void,
  },
  SendMessage: Block<ButtonPropsType>,
};

export type ChatPropsType = {
  contactId: string;
  user: UserType;
  userName: string;
  contactName: string;
  chatName: string;
  tags: string[];
  messagesKeys: string[];
  showEditContactDialog: boolean;
  fetchedMessages: {
    messageId: string;
    senderId: string;
    text: string;
    chatId: string;
    avatar?: string;
  }[];
  EditContactDialog: Block<EditContactDialogPropsType>;
  MessageInput: Block<MessageInputPropsType>;
  EditContactButton: Block<ButtonPropsType>;
};

export type EditProfileProps = {
  avatar?: string;
  isDrawing: boolean;
  closeDialog: () => void;
  DrawAvatarButton: Block<ButtonPropsType>;
  ClearCanvasButton: Block<ButtonPropsType>;
  BackButton: Block<ButtonPropsType>;
  SaveButton?: Block<ButtonPropsType>;
  Avatar: Block<AvatarPropsType>;
  EditUserInfo: Block<FormProps>;
  EditPassword: Block<FormProps>;
  ChangeAvatar: Block<FormProps>;
};

export interface ProfileDialogProps extends Record<string, unknown> {
  user: UserType;
  closeDialog: () => void;
  avatarForm?: string;
  uploadedFile: string | null;
  isFileUploaded: boolean;
  displayName: string;
  email: string;
  login: string;
  name: string;
  surname: string;
  phone: string;
  isEditPassword: boolean;
  isEditUserInfo: boolean;
  passwordForm: {
    oldPassword: string;
    newPassword: string;
  };
  Avatar: Block<AvatarPropsType>;
  BackButton: Block<ButtonPropsType>;
  SaveUploadedAvatarButton: Block<ButtonPropsType>;
  CloseButton: Block<ButtonPropsType>;
  CloseButtonAction: Block<ButtonPropsType>;
  EditPasswordButton: Block<ButtonPropsType>;
  EditUserInfoButton: Block<ButtonPropsType>;
  EditPassword: Block<FormProps>;
  EditUserInfo: Block<FormProps>;
  UploadAvatarButton: Block<{
    label: string;
    events: {
      change: (event: Event) => void;
    };
  }>;
}

export type TextInputBlockProps = {
  fullWidth?: boolean;
  type?: 'text' | 'password';
  placeholder?: string;
  required?: boolean;
  hasError: boolean;
  events: {
    blur: (event: FocusEvent) => void,
    change: (event: Event) => void,
  }
};

export type ContactsListPropType = {
  user: UserType;
  contacts: string[];
  selectedChat: string;
  setSelectedChat: (id: string) => void;
  Search: Block<TextInputBlockProps>;
  SearchButton: Block<ButtonPropsType>;
  ClearButton: Block<ButtonPropsType>;
}

export type ChatsPropsType = {
  user: UserType;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  selectedChat: string;
  showProfileDialog: boolean;
  CurrentChat: Block<ChatPropsType>;
  Avatar: Block<AvatarPropsType>;
  ContactsList: Block<ContactsListPropType>;
  ProfileButton: Block<ButtonPropsType>;
  ProfileDialog: Block<ProfileDialogProps>;
};

export type AuthTab = 'signIn' | 'signUp';

export type AuthPropsType = {
  activeTab: AuthTab;
  SignInLink: Block<LinkPropsType>;
  SignUpLink: Block<LinkPropsType>;
  signIn: boolean;
  signUp: boolean;
  SignIn: Block<FormProps>;
  SignUp: Block<FormProps>;
};

export type ContactPropsType = {
  classList: string[];
  contact: ContactType;
  tagsKeys: string[];
  Avatar: Block<AvatarPropsType>;
  SelectButton: Block<ButtonPropsType>;
}

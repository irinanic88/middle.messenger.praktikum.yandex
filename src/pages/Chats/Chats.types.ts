import {ChatPropsType, Contact} from "../../components/Chat/Chat.types";
import {ButtonPropsType} from "../../components/Button/Button.types";
import {ProfileDialogProps} from "../../components/ProfileDialog/ProfileDialog.types";

export type UserType = {
  id: string;
  avatar: string;
  name: string;
  surname: string;
  userName: string;
  email: string;
  phone: string;
}

export type ChatsPropsType = {
  user: {
    name: string;
    surname: string;
    userName: string;
    id: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    password?: string;
  };
  contacts: Contact[];
  name: string;
  surname: string;
  userName: string;
  selectedChat: string;
  showProfileDialog: boolean;
  CurrentChat: ChatPropsType;
  ProfileButton: ButtonPropsType;
  SearchButton: ButtonPropsType;
  ProfileDialog: ProfileDialogProps;
};

import {UserType} from "../../pages/Chats/Chats.types";
import {ButtonPropsType} from "../Button/Button.types";

export type MessageType = {
  messageId: string;
  chatId: string;
  senderId: string;
  avatar: string;
  text: string;
}

export type ChatPropsType = {
  contactId: string;
  user: UserType;
  userId: string;
  userName: string;
  messages: MessageType[];
  contactName: string;
  chatName: string;
  tags: string[];
  EditContactButton: ButtonPropsType;
  SendMessageButton: ButtonPropsType;
};

export type Contact = {
  chatId: string;
  avatar: string;
  chatName: string;
  name: string;
  userName: string;
  tags: string[];
}

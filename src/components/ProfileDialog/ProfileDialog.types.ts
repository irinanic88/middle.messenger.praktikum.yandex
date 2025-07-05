import {UserType} from "../../pages/Chats/Chats.types";
import {ButtonPropsType} from "../Button/Button.types";

export type ProfileDialogProps = {
  user: UserType;
  closeDialog: () => void;
  name: string;
  surname: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  isEdit: boolean;
  EditButton: ButtonPropsType;
  CloseButton: ButtonPropsType;
  EditProfile: EditProfileProps;
};

export type UserFormData = {
  avatar?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};


export type EditProfileProps = {
  user: UserType;
  closeDialog: () => void;
  name: string;
  surname: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  isDrawing: boolean;
  form: UserFormData;
  DrawAvatarButton: ButtonPropsType;
  SaveAvatarButton: ButtonPropsType;
  ClearCanvasButton: ButtonPropsType;
  BackButton: ButtonPropsType;
  SaveButton: ButtonPropsType;
};

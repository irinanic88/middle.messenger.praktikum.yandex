import { HTTP_METHODS } from '../utils/constants';

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

export type HttpMethodType = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

export type RequestOptions<TData = unknown> = {
  method: HttpMethodType;
  data?: TData | null;
  headers?: Record<string, string>;
  timeout?: number;
  tries?: number;
};

export type HTTPMethod = <T = unknown, TData = unknown>(
  url: string,
  options?: RequestOptions<TData>
) => Promise<T>;

export type UserType = {
  id: string,
  avatar?: string,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  password: string,
  contacts: {
    chatId: string,
    avatar?: string,
    chatName?: string,
    name: string,
    userName: string,
    tags?: string[],
  }[],
}

export type MessageType = {
  messageId: string;
  chatId: string;
  senderId: string;
  avatar?: string;
  text: string;
};

export type ContactType = {
  chatId: string;
  avatar?: string;
  chatName?: string;
  name: string;
  userName: string;
  tags?: string[];
};

export type MessagesDictType = Record<string, MessageType[]>;

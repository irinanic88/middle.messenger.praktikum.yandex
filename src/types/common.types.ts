import { ButtonPropsType } from './componentProps.types';
import Block from '../core/Block';
import { Validator } from '../core/Validator';
import { errorsDict, textInputsDict } from '../utils/constants';

export type EventBusCallback<T extends unknown[] = unknown[]> = (...args: T) => void;

export interface EventBusInterface<Events extends Record<string, unknown[]> = Record<string, unknown[]>> {
  on<K extends keyof Events>(event: K, callback: EventBusCallback<Events[K]>): void;
  off<K extends keyof Events>(event: K, callback: EventBusCallback<Events[K]>): void;
  emit<K extends keyof Events>(event: K, ...args: Events[K]): void;
}

export type BlockProps = Record<string, unknown> & { events?: Record<string, EventListener> };

export interface PropsBase {
  _id?: string;
  events?: Record<string, EventListener>;
  attributes?: Record<string, string>[];
  classList?: string[];
}

export type BlockChildrenType = Record<string, Block>;

export type ValidatorKeys = keyof typeof Validator;

export type FormType = Record<string, string | string[]>

export type FormKeys = keyof typeof textInputsDict;

export type ValidationRule = {
  check: () => boolean;
  error: string;
};

export type ValidationResult = true | string[];

export interface ActionButtonProps {
  title: string;
  onClick: () => void;
  classList?: string[];
  type?: 'button' | 'submit';
  iconSolo?: string;
  isTag?: boolean;
  iconSize?: string;
  iconStart?: string;
  iconEnd?: string;
  disabled?: boolean;
}

export interface SubmitButtonProps extends Partial<ButtonPropsType> {
  title: string;
}

export interface FormProps {
  [key: string]: unknown;
  arrayValues?: string[];
  inputKeys?: string[];
  initialForm: FormType;
  formName: string;
  onSubmit?: (values?: FormType) => void;
  requiredFields?: string[];
  submitButton: SubmitButtonProps,
  actionButtons?: ActionButtonProps[];
  SubmitButton?: Block<ButtonPropsType>;
  submitHandler?: () => void;
}

export interface FormBlockProps extends FormProps, BlockProps {
  [key: string]: unknown;
  inputKeys: string[];
  formActionsKeys: string[];
  showAlert: boolean;
}

export type ErrorKeys = keyof typeof errorsDict;

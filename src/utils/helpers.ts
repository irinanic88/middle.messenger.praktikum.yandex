import { emptyContact, passwordInputs, textInputsDict } from './constants';
import { Button } from '../components/Button/Button';
import { TextInput } from '../components/TextInput/TextInput';
import Block from '../core/Block';
import { ContactType, UserType } from '../types/api.types';
import { FormKeys, FormType } from '../types/common.types';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    console.error(`Root element not found by selector: ${query}`);

    return null;
  }

  root.appendChild(block.getContent());

  return root;
}

export function isObjectEmpty(obj: Record<string, unknown>): boolean {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const getContactById = (
  id: string,
  contacts: ContactType[],
): ContactType | { avatar?: string; name: string; chatName: string; tags: [] } => {
  const contact = contacts.find((c) => c.chatId === id);

  return contact || emptyContact;
};

export const generateTextInputs = (
  form: Record<FormKeys, string>,
  handleChange: (field: FormKeys, value: string) => void,
  handleBlur?: (field: FormKeys, value: string) => void,
  requiredFields: FormKeys[] = [],
) =>
  Object.fromEntries(
    Object.entries(form).map(([field, value]) => [
      field,
      new TextInput({
        id: field,
        label: textInputsDict[field as FormKeys],
        onBlur: handleBlur ? (name: FormKeys, val: string) => handleBlur(name, val) : undefined,
        onChange: (val: string) => handleChange(field as FormKeys, val),
        required: requiredFields.includes(field as FormKeys),
        type: passwordInputs.includes(field) ? 'password' : 'text',
        value,
      }),
    ])
  ) as Record<FormKeys, TextInput>;

export const generateContactTags = (tags: string[], handleClick: (v: string) => void) => tags.reduce((acc, tag, index) => ({
  ...acc,
  [`tag_${index + 1}`]: new Button({
    isTag: true,
    onClick: () => handleClick(tag),
    title: `#${tag}`,
  }),
}), {});

export const allRequiredFieldsFilled = (
  form: Record<string, string>,
  requiredFields?: string[],
): boolean => {
  if (!requiredFields || requiredFields.length === 0) {
    return true;
  }

  return requiredFields.every((key) => {
    const value = form[key];

    return value.trim().length > 0;
  });
};

export const formValuesChanged = (
  currentValues: Record<string, string>,
  initialValues: Record<string, string>,
): boolean => {
  const keys = Object.keys(initialValues);

  return keys.some((key) => currentValues[key] !== initialValues[key]);
};

export const noErrors = (errors: Record<string, string[] | undefined>) => !Object.values(errors).some((errArr) => errArr && errArr.length > 0);

export const prepareStringForm = (
  key: string,
  values: string[],
): Record<string, string> => values.reduce(
  (final, val, index) => ({
    ...final,
    [`${key}_${index + 1}`]: val,
  }),
  {},
);

export const prepareFormValues = (form: FormType): { formValues: Record<string, string>; arrayValues: string[] } => Object.entries(form).reduce(
  (acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc.formValues = {
        ...acc.formValues,
        ...prepareStringForm(key, value),
      };
      acc.arrayValues.push(key);
    } else {
      acc.formValues = { ...acc.formValues, [key]: value };
    }

    return acc;
  },

  { arrayValues: [] as string[], formValues: {} },
);

export const prepareSubmitData = (
  form: Record<string, string>,
  list: string[],
): Record<string, string | string[]> => Object.entries(form).reduce((acc, [key, value]) => {
  const [baseKey, indexPart] = key.split('_');

  if (list.includes(baseKey) && indexPart !== undefined) {
    return {
      ...acc,
      [baseKey]: [
        ...(acc[baseKey] as string[] || []),
        ...(value.trim() ? [value] : []),
      ],
    };
  }

  return { ...acc, [key]: value };
}, {} as Record<string, string | string[]>);

export const prepareInitialFormEditProfile = <
  T extends keyof UserType
>(form: Record<T, unknown>, user: UserType) => (Object.keys(form) as T[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: user[key],
    }),
    {} as Record<T, UserType[T]>
  );

export function queryStringify(data: Record<string, string | number | boolean | null | undefined>): string {
  const keys = Object.keys(data).filter(key => data[key] !== undefined && data[key] !== null);

  if (keys.length === 0) return '';

  return `?${  keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(data[key]))}`).join('&')}`;
}

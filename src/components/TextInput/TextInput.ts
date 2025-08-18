import Block from '../../core/Block';
import { TextInputBlockProps } from '../../types/componentProps.types';

const template = `
<div class="text-input">
  {{#if label}}
    <label class="input__label {{#if (eq required true)}} required{{/if}}" for="{{id}}">{{ label }}</label>
  {{/if}}
  <input
      class="text-input__input{{#if fullWidth}} full-width{{/if}}"
      name="{{id}}"
      id="{{id}}"
      type={{type}}
      placeholder="{{placeholder}}"
      value="{{value}}"
  >
</div>
`;

export class TextInput extends Block<TextInputBlockProps> {
  constructor(props: {
    onChange?: (v: string) => void,
    onBlur?: (name: string, v: string) => void,
    fullWidth?: boolean,
    placeholder?: string,
    type?: "text" | "password",
    required?: boolean,
    label?: string,
    value?: string,
    id: string,
  }) {
    super({
      ...props,
      events: {
        blur: (event: FocusEvent) => {
          event.preventDefault();
          event.stopPropagation();

          const target = event.target as HTMLInputElement;

          props.onBlur?.(target.name, target.value);
        },
        change: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const target = event.target as HTMLInputElement;

          props.onChange?.(target.value);
        },
      },
      fullWidth: props.fullWidth || false,
      hasError: false,
      placeholder: props.placeholder || '',
      required: props.required || false,
      type: props.type || 'text',
    });
  }

  render(): string {
    return template;
  }
}

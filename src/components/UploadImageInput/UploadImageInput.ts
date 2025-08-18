import Block from '../../core/Block';

const template = `
  <label for="avatar-upload" class="upload__label">
    {{label}}
    <input
      class="upload__input"
      name='{{id}}'
      type="file"
      id='{{id}}'
      accept=".png, .jpg, .jpeg"
    />
  </label>
`;

export class UploadImageInput extends Block<{
  label: string,
  events: {
    change: (event: Event) => void,
  },
}> {
  constructor(props: {
    onChange?: (v: string) => void,
    label: string,
    id: string,
  }) {
    const {label, onChange} = props;

    super({
      ...props,
      events: {
        change: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const target = event.target as HTMLInputElement;
          const file = target.files?.[0];

          if(file) {
            const url = URL.createObjectURL(file);

            onChange?.(url);
          }
        },
      },
      label,
    });
  }

  render(): string {
    return template;
  }
}


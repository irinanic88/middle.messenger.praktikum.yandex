import Block from '../../core/Block';
import { textInputsDict } from '../../utils/constants';

const template = `
<div class="alert">
  <span class="alert__message">Please, correct the validation errors:</span>
  <div class="alert__fields">
    {{#if customErrors}}
      {{#each customErrors}}
        <div class="alert__field">
          <span class="alert__field-name">{{@key}}</span>
          <ul class="alert__errors">
            <li class="alert__error">{{this}}</li>
          </ul>
        </div>
      {{/each}}
    {{else}}
      {{#each errors}}
        <div class="alert__field">
          <span class="alert__field-name">{{lookup ../textInputsDict @key}}</span>
          <ul class="alert__errors">
            {{#each this}}
              <li class="alert__error">{{this}}</li>
            {{/each}}
          </ul>
        </div>
      {{/each}}
    {{/if}}
  </div>
</div>
`;

export class Alert extends Block {
  constructor(props: { errors?: Record<string, string[]>, customErrors?: Record<string, string[] | string>}) {
    super({
      ...props,
      customErrors: props.customErrors,
      errors: props.errors,
      textInputsDict,
    });
  }

  render(): string {
    return template;
  }

  componentDidUpdate(): boolean {
    return true;
  }
}

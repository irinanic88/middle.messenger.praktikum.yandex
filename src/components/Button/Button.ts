import Block from '../../core/Block';
import { ButtonProps, ButtonPropsType } from '../../types/componentProps.types';

const template = `
<button {{#if disabled}}disabled="true"{{/if}} type="{{type}}">
  {{#if (or iconStart iconSolo)}}
    <img src="{{or iconStart iconSolo}}" alt="button" style="height: {{iconSize}}"/>
  {{/if}}

  {{#if title}}{{title}}{{/if}}

  {{#if iconEnd}}
    <img src="{{iconEnd}}" alt="button" style="height: {{iconSize}}"/>
  {{/if}}
</button>
`;

export class Button extends Block<ButtonPropsType> {
  constructor(props: ButtonProps) {

    const {
      iconEnd,
      iconSize,
      iconSolo,
      iconStart,
      isTag,
      type,
      classList,
      onClick,
      disabled,
    } = props;

    super({
      ...props,
      classList: isTag
        ? ['button_tag']
        : [
          'button',
          ...(classList || []),
          ...(iconSolo ? ['button_icon'] : []),
          ...(disabled ? ['button__disabled'] : []),
        ],
      disabled: disabled || false,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          onClick();
        },
      },
      iconEnd,
      iconSize: iconSize || '15px',
      iconSolo,
      iconStart,
      isTag: isTag || false,
      type: type || 'button',
    });
  }

  render(): string {
    return template;
  }

  protected componentDidUpdate(oldProps: ButtonPropsType, newProps: ButtonPropsType): boolean {
    const { isTag, classList, iconSolo, disabled } = newProps;

    if (
      oldProps.isTag !== isTag ||
      oldProps.classList !== classList ||
      oldProps.iconSolo !== iconSolo ||
      oldProps.disabled !== disabled
    ) {
      this.props.classList = isTag
        ? ['button_tag']
        : [
          'button',
          ...(classList || []),
          ...(iconSolo ? ['button_icon'] : []),
          ...(disabled ? ['button__disabled'] : []),
        ];
    }

    return true;
  }
}

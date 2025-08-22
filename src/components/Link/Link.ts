import Block from '../../core/Block';
import { LinkPropsType } from '../../types/componentProps.types';

const template = '<a href={{href}} class="link {{#if active}}link__active{{/if}}">{{title}}</a>';

export class Link extends Block<LinkPropsType> {
  constructor(props: {
    onClick: () => void,
    active?: boolean,
    href: string,
    title: string,
    id: string,
  }) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          props.onClick();
        },
      },
    });
  }

  render(): string {
    return template;
  }
}

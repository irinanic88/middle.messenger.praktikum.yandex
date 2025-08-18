import Block from '../../core/Block';
import { AvatarPropsType } from '../../types/componentProps.types';

const template = `
<div class="avatar">
  <img src="{{src}}" alt="{{altText}}"/>
</div>
`;

export class Avatar extends Block<AvatarPropsType> {
  constructor(props: {src?: string, altText?: string, isUser: boolean, classList?: string[]}) {
    const {
      src, altText, isUser, classList,
    } = props;
    const defaultAvatar = isUser
      ? '../../../public/icons/cat_icon_1.png'
      : '../../../public/icons/cat_icon_2.png';

    super({
      ...props,
      altText: altText || 'avatar',
      classList,
      src: src || defaultAvatar,
    });
  }

  render(): string {
    return template;
  }
}

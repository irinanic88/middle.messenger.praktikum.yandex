import Block from '../../core/Block';
import { ErrorKeys } from '../../types/common.types';
import { errorsDict } from '../../utils/constants';

const template = `
<div class='error-page'>
  <div class='error-page__container'>
    <img class='error-page__img' src={{img}} alt='page-not-found-image' />
    <p class='error-page__text'>{{text}}</p>
  </div>
</div>
`;

export class Error extends Block {
  constructor(props: { error: ErrorKeys }) {
    const { img, text } = errorsDict[props.error];

    super({
      ...props,
      img,
      text,
    });
  }

  render(): string {
    return template;
  }
}

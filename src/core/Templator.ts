import Handlebars from 'handlebars';

import { registerCommonHelpers } from '../utils/handlebars';

registerCommonHelpers(Handlebars);

export class Templator {
  static compile<T extends Record<string, unknown>>(template: string, context: T): string {
    const compiled = Handlebars.compile(template);

    return compiled(context);
  }
}

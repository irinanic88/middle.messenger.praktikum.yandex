import Handlebars from 'handlebars';
import {registerCommonHelpers} from "../utils/handlebars";

registerCommonHelpers(Handlebars);

export class Templator {
  static compile(template: string, context: Record<string, any>): string {
    const compiled = Handlebars.compile(template);

    return compiled(context);
  }
}

import Handlebars from 'handlebars';

export class Templator {
  static compile(template: string, context: Record<string, any>): string {
    const compiled = Handlebars.compile(template);

    return compiled(context);
  }
}

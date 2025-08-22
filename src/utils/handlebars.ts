import Handlebars from 'handlebars';

const eqHelper = (a: string | number, b: string | number) => a === b;
const notHelper = (value: unknown) => !value;
const orHelper = <T, U>(a: T, b: U): T | U => a || b;

export function registerCommonHelpers(hbs: typeof Handlebars) {
  hbs.registerHelper('eq', eqHelper);
  hbs.registerHelper('not', notHelper);
  hbs.registerHelper('or', orHelper);
}

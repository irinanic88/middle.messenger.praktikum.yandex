import Handlebars from 'handlebars';

export const eqHelper = (a: any, b: any) => a === b;
export const notHelper =  (value) => {
  return !value;
}

export function registerCommonHelpers(hbs: typeof Handlebars) {
  hbs.registerHelper('eq', eqHelper);
  hbs.registerHelper('not', notHelper);
}

import Handlebars from 'handlebars';

const eqHelper = (a: any, b: any) => a === b;
const notHelper =  (value) => {
  return !value;
}
const orHelper = (a, b) => {
  return a || b;
};

export function registerCommonHelpers(hbs: typeof Handlebars) {
  hbs.registerHelper('eq', eqHelper);
  hbs.registerHelper('not', notHelper);
  hbs.registerHelper('or', orHelper);
}

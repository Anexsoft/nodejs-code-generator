const Handlebars = require('handlebars');
const pluralize = require('pluralize');

Handlebars.registerHelper('lowercase', (str) => {
  return (str || '').toLowerCase();
});

Handlebars.registerHelper('pluralize', (str) => {
  return pluralize(str || '');
});

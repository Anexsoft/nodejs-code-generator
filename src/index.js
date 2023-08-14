// initialize handlebars extensions
require('./common/handlebars');

// export comands
const initCommand = require('./commands/init');
const buildCommand = require('./commands/build');

module.exports = {
  initCommand,
  buildCommand,
};

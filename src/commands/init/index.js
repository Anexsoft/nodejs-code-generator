const fs = require('fs');

const cfgTmpl = {
  entities: ['<<entity1>>', '<<entity2>'],
};

module.exports = {
  command: 'init',
  description:
    'Create a new configuration file, this action will replace a previous file',
  builder: () => {},
  handle: (argv) => {
    fs.writeFileSync('./config.json', JSON.stringify(cfgTmpl, null, 2));
  },
};

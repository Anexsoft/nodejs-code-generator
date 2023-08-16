const fs = require('fs');

const cfgTmpl = {
  domains: ['Example'],
  // they are shared between the whole project
  sharedModules: {
    database: {
      path: '/shared/database/index.[ext]',
    },
  },
  // they are created one per domain
  modules: {
    service: {
      path: '/services/[name].service.[ext]',
      refs: {
        repository: './repositories',
        domain: './repositories/domain',
      },
    },
    repository: {
      path: '/services/repositories/[name].repository.[ext]',
      refs: {
        domain: './domain',
      },
    },
    domain: {
      path: '/services/repositories/domain/[name].domain.[ext]',
    },
  },
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

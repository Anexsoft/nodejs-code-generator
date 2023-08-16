const fs = require('fs');

const cfgTmpl = {
  domains: ['Example'],
  paths: [
    { name: 'shared', path: '/shared/database/index.[ext]' },
    {
      name: 'service',
      path: '/services/[name].service.[ext]',
      refs: {
        repository: './repositories',
        domain: './repositories/domain',
      },
      children: [
        {
          name: 'repository',
          path: '/services/repositories/[name].repository.[ext]',
          refs: {
            domain: './domain',
          },
          children: [
            {
              name: 'domain',
              path: '/services/repositories/domain/[name].domain.[ext]',
            },
          ],
        },
      ],
    },
  ],
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

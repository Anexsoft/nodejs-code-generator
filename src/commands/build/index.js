const { execSync } = require('child_process');

const colors = require('colors');

const { LANGUAGES, DATABASES, MODULES } = require('../../common/constants');

// handlers
const dbHandler = require('./database');
const repositoryHandler = require('./repository');
const serviceHandler = require('./service');
const domainHandler = require('./domain');

function _moduleResolver(domain, { name, path, refs, children }, argv) {
  if (name === MODULES.service) {
    _prepareServiceHandler(domain, { ...argv, path, refs });
  }

  if (name === MODULES.repository) {
    _prepareRepositoryHandler(domain, { ...argv, path, refs });
  }

  if (name === MODULES.domain) {
    _prepareDomainHandler(domain, { ...argv, path });
  }

  if (children) {
    for (const child of children) {
      _moduleResolver(domain, child, argv);
    }
  }
}

function _prepareDatabaseHandler(argv) {
  console.info(`* ${colors.bold.cyan('Database')}: preparing files`);
  dbHandler(argv);
  console.info(`* ${colors.bold.cyan('Database')}: succesfuly done`);
}

function _prepareServiceHandler(domain, argv) {
  console.info(`* ${colors.bold.cyan('Service')}: preparing files`);
  serviceHandler(domain, argv);
  console.info(`* ${colors.bold.cyan('Service')}: succesfuly done`);
}

function _prepareRepositoryHandler(domain, argv) {
  console.info(`* ${colors.bold.cyan('Repository')}: preparing files`);
  repositoryHandler(domain, argv);
  console.info(`* ${colors.bold.cyan('Repository')}: succesfuly done`);
}

function _prepareDomainHandler(domain, argv) {
  console.info(`* ${colors.bold.cyan('Domain')}: preparing files`);
  domainHandler(domain, argv);
  console.info(`* ${colors.bold.cyan('Domain')}: succesfuly done`);
}

module.exports = {
  command: 'build',
  description: 'Generate code from configuration file',
  builder: (yargs) => {
    yargs.option('lang', {
      describe: 'Choose a technology',
      demandOption: true,
      type: 'string',
      choices: [LANGUAGES.typescript, LANGUAGES.javascript],
    });

    yargs.option('db', {
      describe: 'Choose an db engine',
      demandOption: true,
      type: 'string',
      choices: [DATABASES.mongodb, DATABASES.mssql, DATABASES.mysql],
    });
  },
  handle: (argv) => {
    try {
      const cfg = require('../../../config.json');

      const { lang, db } = argv;

      // destroy previous builds
      execSync('npm run clean');

      console.info(`${colors.bold('Build')}: ` + colors.cyan(`${lang}/${db}`));

      for (const currentPath of cfg.paths) {
        if (currentPath.name === MODULES.shared) {
          _prepareDatabaseHandler({ ...argv, path: currentPath.path });
        } else {
          for (const domain of cfg.domains) {
            _moduleResolver(domain, currentPath, argv);
          }
        }
      }

      console.info(
        `${colors.bold('Build')}: ` + colors.cyan('succesfuly done'),
      );
    } catch (error) {
      console.error(
        `${colors.red(`${colors.bold('Building error')}:`)} ${error.message}`,
      );
    }
  },
};

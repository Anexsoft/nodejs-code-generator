const { execSync } = require('child_process');

const colors = require('colors');

const { LANGUAGES, DATABASES } = require('../../common/constants');

// handlers
const dbHandler = require('./database');
const serviceHandler = require('./repository');
const repositoryHandler = require('./service');
const domainHandler = require('./domain');

function _prepareDatabaseHandler(argv) {
  console.info(`* ${colors.bold.cyan('Database')}: preparing files`);
  dbHandler(argv);
  console.info(`* ${colors.bold.cyan('Database')}: succesfuly done`);
}

function _prepareServiceHandler(entity, argv) {
  console.info(`* ${colors.bold.cyan('Service')}: preparing files`);
  serviceHandler(entity, argv);
  console.info(`* ${colors.bold.cyan('Service')}: succesfuly done`);
}

function _prepareRepositoryHandler(entity, argv) {
  console.info(`* ${colors.bold.cyan('Repository')}: preparing files`);
  repositoryHandler(entity, argv);
  console.info(`* ${colors.bold.cyan('Repository')}: succesfuly done`);
}

function _prepareDomainHandler(entity, argv) {
  console.info(`* ${colors.bold.cyan('Domain')}: preparing files`);
  domainHandler(entity, argv);
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

      _prepareDatabaseHandler(argv);

      for (const entity of cfg.entities) {
        console.info(`${colors.bold.yellow(entity)}: preparing module`);

        _prepareServiceHandler(entity, argv);
        _prepareRepositoryHandler(entity, argv);

        if (lang === LANGUAGES.typescript) {
          _prepareDomainHandler(entity, argv);
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

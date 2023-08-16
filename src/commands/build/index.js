const { execSync } = require('child_process');

const colors = require('colors');

const { LANGUAGES, DATABASES } = require('../../common/constants');
const { moduleHandler, dbModuleHandler } = require('./handler');

function _moduleTemplateHandler(module, domain, argv) {
  console.info(`* ${colors.bold.cyan(module)}: preparing files`);
  moduleHandler(module, domain, argv);
  console.info(`* ${colors.bold.cyan(module)}: succesfuly done`);
}

function _dbTemplateHandler(argv) {
  console.info(`* ${colors.bold.cyan('database')}: preparing files`);
  dbModuleHandler(argv);
  console.info(`* ${colors.bold.cyan('database')}: succesfuly done`);
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

    yargs.option('ext', {
      describe:
        'Choose your extended template file. (Original template will be used if your extension does not exist)',
      default: null,
      type: 'string',
    });
  },
  handle: (argv) => {
    try {
      const cfg = require('../../../config.json');

      const { lang, db, ext } = argv;

      // destroy previous builds
      execSync('npm run clean');

      if (!ext) {
        console.info(
          `${colors.bold('Build')}: ` + colors.cyan(`${lang}/${db}`),
        );
      } else {
        console.info(
          `${colors.bold('Build')}: ` + colors.cyan(`${lang}/${db} --${ext}`),
        );
      }

      _dbTemplateHandler({
        path: cfg.sharedModules.database.path,
        db,
        ext,
        ...argv,
      });

      for (const domain of cfg.domains) {
        for (const module of Object.keys(cfg.modules)) {
          _moduleTemplateHandler(module, domain, {
            ...argv,
            path: cfg.modules[module].path,
            refs: cfg.modules[module].refs,
          });
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

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { initCommand, buildCommand } = require('./src');

yargs(hideBin(process.argv))
  .command(
    initCommand.command,
    initCommand.description,
    initCommand.builder,
    initCommand.handle,
  )
  .command(
    buildCommand.command,
    buildCommand.description,
    buildCommand.builder,
    buildCommand.handle,
  )
  .demandCommand(1)
  .parse();

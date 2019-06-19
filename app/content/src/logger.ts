/* tslint:disable */
const chalk =    require('chalk');
const root_log = require('loglevel')
const prefix =   require('loglevel-plugin-prefix');

const colors:any = {
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

prefix.reg(root_log);
root_log.enableAll();

prefix.apply(root_log, {
  format(level:any, name:any) {
    const LEVEL = level.toUpperCase();
    if (LEVEL==='DEBUG') return '';
    return `${chalk.green(`${name}: ${colors[LEVEL](level)}`)}`;
  },
});

const log = root_log.getLogger('content-app');
const puts = log.debug;

export { log, puts }

/* tslint:disable */
const chalk = require('chalk');
const root_log = require('loglevel');
const prefix = require('loglevel-plugin-prefix');
const colors = {
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
};
prefix.reg(root_log);
root_log.enableAll();
prefix.apply(root_log, {
    format(level, name) {
        return `${chalk.green(`${name}: ${colors[level.toUpperCase()](level)}`)}`;
    },
});
const log = root_log.getLogger('wmtutor');
export { log };
//# sourceMappingURL=logger.js.map
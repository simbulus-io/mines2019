//Setup logger
import * as logger    from 'winston';
import * as _         from 'lodash';

const silent = _.includes(process.argv, '--silent');

const console_logger = new logger.transports.Console({
  level: 'debug',
  format: logger.format.combine(logger.format.colorize(), logger.format.simple()),
});
const logger_conf = {
  transports: [console_logger],
};
logger.configure(logger_conf);
logger.info('Setup up winston console logger');

export {logger};

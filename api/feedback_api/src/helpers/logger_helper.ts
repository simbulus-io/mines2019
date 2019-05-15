import * as YAML    from 'yamljs';
import * as path    from 'path';
import * as winston from 'winston';
import colors       from 'colors';
import fs           from 'fs';


const { format, createLogger}  = winston;

const is_test = process.env.NODE_ENV === 'test';
const is_prod = process.env.NODE_ENV === 'production';

export class LoggerHelper {

  public logger: any;

  public constructor(logfile?: string) {

    ////////////////////////////////////////////////
    // winston
    ////////////////////////////////////////////////

    const custom_formatter = format.printf((info: any) => {
      let msg = `level: ${info.level}`;
      msg = !is_test ? `${info.timestamp} ` + msg : msg;
      msg = info.message ? msg + ` message: ${info.message}` : msg;
      if (info[Symbol.for('level')] === 'error') {
        if(info.stack) {
          msg += colors.yellow(`\n${info.stack}`);
        } else {
          msg += colors.yellow(`\nWARNING: detected error level log without stack trace - use log.error(new Error(msg))`);
        }
      }
      return msg;
    });

    // Logger config
    const structured_conf = {
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({
          stack: true,
        }),
        format.splat(),
        format.json(),
      ),
    };

    const unstructured_conf = {
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({
          stack: true,
        }),
        custom_formatter,
      ),
    };

    winston.configure(unstructured_conf);
    this.logger = winston;

    // console logging for dev
    if (!is_prod && !is_test) {
      this.logger.add(new winston.transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple(),
          format.errors({
            stack: true,
          }),
          custom_formatter,
        ),
      }));
    }

    // logfile either by construction parameter or config yaml
    if (!logfile) {
      const config_file: string = `${__dirname}/../config.yaml`;
      if (this.is_file(config_file)) {
        const app_config = YAML.load(config_file);
        if (this.is_dir(path.dirname(app_config.logfile))) {
          logfile = app_config.logfile;
        }
      }
    }

    // file logging
    if (this.is_dir(path.dirname(logfile!))) {
      this.logger.add(new winston.transports.File({
        filename: logfile,
        handleExceptions: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        options: is_test ? { flags: 'w'} : {}, // overwrite if testing
      }));
    }

  }

  private is_dir(the_path: string) {
    try {
      const stat = fs.statSync(the_path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  }

  private is_file(the_path: string) {
    try {
      const stat = fs.statSync(the_path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }



}

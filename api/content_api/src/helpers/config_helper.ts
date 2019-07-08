import * as YAML   from 'yamljs';
import * as fs     from 'fs';
import * as logger from 'winston';
import * as _      from 'lodash';

const { child_process } = require('child_process');

export class ConfigHelper {

  public config: any;

  public constructor() {

    ////////////////////////////////////////////////
    // app config (config.yaml)
    ////////////////////////////////////////////////
    const config_file = `${__dirname}/../config.yaml`;
    let app_config: any = {};
    if (this.is_file(config_file)) {
      app_config = YAML.load(config_file);
    } else {
      logger.error(`Error in config_helper constructor: Can't stat ${config_file}`);
      process.exit(1);
    }
    this.config = app_config;
    logger.info('Configuration done');
  }

  private is_file(path: string) {
    try {
      const stat = fs.statSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

}

//module.exports = logger;




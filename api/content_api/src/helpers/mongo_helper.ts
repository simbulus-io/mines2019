
import * as logger         from 'winston';
import { MongoClient }     from 'mongodb';
import { ConfigHelper } from './config_helper';

// Helper to configure MongoDB
//
export class MongoHelper {

  public static async connect(): Promise<MongoClient> {

    const default_mongo_conf =  {
      host: '10.0.1.3',
      port: '27017',
    };

    let mongo_url: string;
    if (process.env.DATABASE_URL) {
        // The below is for running inside the base-express docker container
      mongo_url = process.env.DATABASE_URL;
      logger.info(`initializing mongo from DATABASE_URL to ${mongo_url}`);
    } else {
      mongo_url = 'mongodb://' + default_mongo_conf.host + ':' + default_mongo_conf.port;
      logger.warn(`DATABASE_URL was not defined in the enviornment using ${mongo_url}`);
    }

    try {
      const client  = await MongoClient.connect(mongo_url);
      logger.info(`Successfully to mongodb at ${mongo_url}`);
      return client;
    } catch (e) {
      logger.error(`Failed to connect to mongodb at ${mongo_url} ${e}`);
      return Promise.reject();
    }
  }
}

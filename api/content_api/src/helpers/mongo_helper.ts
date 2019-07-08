
import * as logger         from 'winston';
import { MongoClient }     from 'mongodb';
import { ConfigHelper } from './config_helper';

// Helper to configure MongoDB
//
export class MongoHelper {

  public static async connect(config: any): Promise<MongoClient> {

    const mongo_conf =  {
      host: 'localhost',
      port: '27027',
    };

    let mongo_url: string;
    if ( config.database_url ) {
      mongo_url = config.database_url;
    } else if (process.env.DATABASE_URL) {
        // The below is for running inside the base-express docker container
      mongo_url = process.env.DATABASE_URL;
    } else {
      mongo_url = 'mongodb://' + mongo_conf.host + ':' + mongo_conf.port;
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

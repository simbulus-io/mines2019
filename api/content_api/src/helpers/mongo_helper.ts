
import * as logger         from 'winston';
import { MongoClient, Db } from 'mongodb';
import { ConfigHelper }    from './config_helper';

// Helper to configure MongoDB
//
export class MongoHelper {

  public static async connect(): Promise<[MongoClient, Db]> {

    const default_mongo_conf =  {
      //url : 'http://10.0.1.3:27017',
      url : 'mongodb://10.0.1.3:27017',
      db_name: 'internal_tools_gester',
    };

    let mongo_url: string;
    if (process.env.DATABASE_URL) {
      mongo_url = process.env.DATABASE_URL;
      logger.info(`initializing mongo from env.DATABASE_URL to ${mongo_url}`);
    } else {
      mongo_url = default_mongo_conf.url;
      logger.warn(`DATABASE_URL was not defined in the enviornment using ${mongo_url}`);
    }

    let db_name: string;
    if (process.env.MONGO_DBNAME) {
      db_name = process.env.MONGO_DBNAME;
      logger.info(`initializing mongo from env.MONGO_DBNAME to ${db_name}`);
    } else {
      db_name = default_mongo_conf.db_name;
      logger.warn(`MONGO_DBNAME was not defined in the enviornment using ${db_name}`);
    }

    
    try {
      const client  = await MongoClient.connect(mongo_url);
      logger.info(`Successfully connected to mongodb at ${mongo_url}`);
      const db = client.db(db_name);
      return [client, db];
    } catch (e) {
      logger.error(`Failed to connect to mongodb at ${mongo_url} ${e}`);
      return Promise.reject();
    }
  }
}

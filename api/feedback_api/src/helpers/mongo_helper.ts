
import * as logger         from 'winston';
import { MongoClient }     from 'mongodb';

// Helper to configure MongoDB
//
export class MongoHelper {
  public static async connect(): Promise<MongoClient> {
    const mongo_conf =  {
      host: 'localhost',
      port: '27027',
    };
    const mongo_url = 'mongodb://mongodb:27017/content';
    // const mongo_url = 'mongodb://' + mongo_conf.host + ':' + mongo_conf.port;
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

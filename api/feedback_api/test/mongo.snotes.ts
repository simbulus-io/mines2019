import * as _                      from 'lodash';
import { MongoHelper }             from '../src/helpers/mongo_helper';
import { logger }                  from './logger_helper';
import { MongoClient }             from 'mongodb';
import { exitOnError } from 'winston';
import { random_snote } from '../src/util/randomnote';

let mongo: MongoClient;

beforeAll(async () => {
  mongo = await MongoHelper.connect();
});

afterAll(async () => {
  logger.info('afterAll');
});

describe('MongoHelper Sticky Note tests', () => {
    test('TestWrite', async () => {
    // Here we create or update 10 documents in the feedback database in the test_collection

    try {
      const collection = mongo.db('feedback').collection('snotes');
      const promises: Array<Promise<any>> = [];
      for (let i = 0; i < 10; ++i) {
        const rand_note = new random_snote();
        const rand_idx = rand_note.get_idx();
        const data = {idx: rand_idx, author: rand_note.random_name(), content: rand_note.random_content(), type: 'snote', timestamp: rand_note.get_timestamp(), x: rand_note.random_x(), y: rand_note.random_y() };
        const promise = collection.updateOne(
          { idx: rand_idx},        // insert index
          { $set: data },   // write concern (data we are updating)
          { upsert: true }, // upsert means create document if it does not exist
        );
        promises.push(promise);
      }
      const rval = await Promise.all(promises);
      logger.info(rval);
      logger.info('Done');
      return;
    } catch (e) {
      logger.error('Unexpected Exception TestWrite', e);
    }
  });

});

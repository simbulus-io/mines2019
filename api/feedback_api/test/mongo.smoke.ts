import * as _                      from 'lodash';
import { MongoHelper }             from '../src/helpers/mongo_helper';
import { logger }                  from './logger_helper';
import { MongoClient }             from 'mongodb';
import { exitOnError } from 'winston';

const randomname = require('random-name');

let mongo: MongoClient;

beforeAll(async () => {
  mongo = await MongoHelper.connect();
});

afterAll(async () => {
  logger.info('afterAll');
});

describe('MongoHelper smoke tests', () => {
  test('TestWrite', async () => {
    // Here we create or update 10 documents in the feedback database in the test_collection

    try {
      const collection = mongo.db('feedback').collection('test_collection');
      const promises: Array<Promise<any>> = [];
      for (let i = 0; i < 10; ++i) {
        const data = {idx: i, name: randomname.first() };
        const promise = collection.updateOne(
          { idx: i},        // insert index
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
  test('TestReduce', async () => {
    const data = [
      {idx: 0, shared_idx: 0},
      {idx: 1, shared_idx: 0},
      {idx: 2, shared_idx: 0},
      {idx: 3, shared_idx: 1},
      {idx: 4, shared_idx: 1},
      {idx: 5, shared_idx: 1},
    ];
    const groups = _.reduce(data, (memo: any[], value) => {
      // initialize group if necessary
      if(!memo[value.shared_idx]) { memo[value.shared_idx] = []; }
      // accumulate using shared index
      memo[value.shared_idx].push(value);
      // don't forget to return accumulator
      return memo;
    }, []);
    // pretty print
    logger.info(JSON.stringify(groups, null, 2));
  });
});

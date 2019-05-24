import * as _                      from 'lodash';
import { MongoHelper }             from '../src/helpers/mongo_helper';
import { logger }                  from './logger_helper';

const randomname = require('random-name');

describe('MongoHelper smoke tests', () => {

  test('TestWrite', async () => {
    const mongo = await MongoHelper.connect();
    const collection = mongo.db('feedback').collection('test_collection');
    for (let i = 0; i < 10; ++i) {
      const data = {idx: i, name: randomname.first() };
      const rval = await collection.updateOne(
        { idx: i},        // insert index
        { $set: data },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      logger.info(rval);
    }
  });

});

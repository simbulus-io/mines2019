import * as _                      from 'lodash';
import { MongoHelper }             from '../src/helpers/mongo_helper';
import { logger }                  from './logger_helper';
import { MongoClient }             from 'mongodb';
import { exitOnError }             from 'winston';
import {Guid}                      from 'guid-typescript';

let mongo: MongoClient;

beforeAll(async () => {
  mongo = await MongoHelper.connect();
});

afterAll(async () => {
  logger.info('afterAll');
  await mongo.close();
});

describe('Creating Example Content Provider Documents', () => {
  test('CreateTestProviders', async () => {
    try {
      const collection = mongo.db('content').collection('content_providers');
      const promises: Array<Promise<any>> = [];

      const data_engageNY = {
        idx: Guid.raw(),
        name: 'EngageNY',
      };
      const promise_engageNY = collection.updateOne(
        { idx: data_engageNY.idx },
        { $set: data_engageNY },
        { upsert: true },
      );
      promises.push(promise_engageNY);

      const data_other = {
        idx: Guid.raw(),
        name: 'Other',
      };
      const promise_other = collection.updateOne(
        { idx: data_other.idx },
        { $set: data_other },
        { upsert: true },
      );
      promises.push(promise_other);

      const rval = await Promise.all(promises);
      logger.info(rval);
      logger.info('Done');
    } catch (e) {
      logger.error('Unexpected Exception TestWrite', e);
    }
    return;
  });
});


describe('Creating Example Content Lesson Documents ', () => {
  test('CreateTestLessons', async () => {
    // Here we create or update 20 documents in the feedback database in the snotes
    try {
      const collection = await mongo.db('content').collection('content_lessons');
      const promises: Array<Promise<any>> = [];
      const docs = await mongo.db('content').collection('content_providers').find({name: 'EngageNY'}).toArray();
      const engageNY_idx = docs[0].idx;

      const data_k1_1 = {
        idx: Guid.raw(),
        content_provider_idx: engageNY_idx,
        grade: 'Kindergarten',
        module: '1',
        number: '1',
        url: 'https://www.engageny.org/file/112161/download/math-gk-m1-topic-a-lesson-1.pdf?token=Dx7w8ePf',
        status: 'unprocessed',
        notes: [],
        keywords: [],
      };
      const promise_k1_1 = collection.updateOne(
        { idx: data_k1_1.idx},        // insert index
        { $set: data_k1_1 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_k1_1);

      const data_k1_2 = {
        idx: Guid.raw(),
        content_provider_idx: engageNY_idx,
        grade: 'Kindergarten',
        module: '1',
        number: '2',
        url: 'https://www.engageny.org/file/112186/download/math-gk-m1-topic-a-lesson-2.pdf?token=qQS43S7m',
        status: 'unprocessed',
        notes: [],
        keywords: [],
      };
      const promise_k1_2 = collection.updateOne(
        { idx: data_k1_2.idx},        // insert index
        { $set: data_k1_2 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_k1_2);

      const data_f1_1 = {
        idx: Guid.raw(),
        content_provider_idx: engageNY_idx,
        grade: 'First Grade',
        module: '1',
        number: '1',
        url: 'https://www.engageny.org/file/37316/download/math-g1-m1-topic-a-lesson-1.pdf?token=uB17rZID',
        status: 'unprocessed',
        notes: [],
        keywords: [],
      };
      const promise_f1_1 = collection.updateOne(
        { idx: data_f1_1.idx},        // insert index
        { $set: data_f1_1 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_f1_1);

      const data_f1_2 = {
        idx: Guid.raw(),
        content_provider_idx: engageNY_idx,
        grade: 'First Grade',
        module: '1',
        number: '2',
        url: 'https://www.engageny.org/file/37331/download/math-g1-m1-topic-a-lesson-2.pdf?token=1JextzPW',
        status: 'unprocessed',
        notes: [],
        keywords: [],
      };
      const promise_f1_2 = collection.updateOne(
        { idx: data_f1_2.idx},        // insert index
        { $set: data_f1_2 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_f1_2);

      const rval = await Promise.all(promises);
      logger.info(rval);
      logger.info('Done');
    } catch (e) {
      logger.error('Unexpected Exception TestWrite', e);
    }
    return;
  });
});

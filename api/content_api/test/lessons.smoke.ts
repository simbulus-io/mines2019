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


describe('Creating Example Content Lesson Documents ', () => {
  test('CreateTestLessons', async () => {
    // Here we create or update 20 documents in the feedback database in the snotes
    try {
      const collection = await mongo.db('content').collection('content_lessons');
      const promises: Array<Promise<any>> = [];

      const data_k1_1 = {
        idx: Guid.raw(),
        path: 'EngageNY/Kindergarten/Module 1',
        name: 'Lesson 1',
        url: 'https://www.engageny.org/file/112161/download/math-gk-m1-topic-a-lesson-1.pdf?token=Dx7w8ePf',
        status: 'unprocessed',
        notes: [],
        keywords: [],
        standards: [],
      };
      const promise_k1_1 = collection.updateOne(
        { idx: data_k1_1.idx},        // insert index
        { $set: data_k1_1 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_k1_1);

      const data_k1_2 = {
        idx: Guid.raw(),
        path: 'EngageNY/Kindergarten/Module 1',
        name: 'Lesson 2',
        url: 'https://www.engageny.org/file/112186/download/math-gk-m1-topic-a-lesson-2.pdf?token=qQS43S7m',
        status: 'unprocessed',
        notes: [],
        keywords: [],
        standards: [],
      };
      const promise_k1_2 = collection.updateOne(
        { idx: data_k1_2.idx},        // insert index
        { $set: data_k1_2 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_k1_2);

      const data_f1_1 = {
        idx: Guid.raw(),
        path: 'EngageNY/Grade 1/Module 1',
        name: 'Lesson 1',
        url: 'https://www.engageny.org/file/37316/download/math-g1-m1-topic-a-lesson-1.pdf?token=uB17rZID',
        status: 'unprocessed',
        notes: [],
        keywords: [],
        standards: [],
      };
      const promise_f1_1 = collection.updateOne(
        { idx: data_f1_1.idx},        // insert index
        { $set: data_f1_1 },   // write concern (data we are updating)
        { upsert: true }, // upsert means create document if it does not exist
      );
      promises.push(promise_f1_1);

      const data_f1_2 = {
        idx: Guid.raw(),
        path: 'EngageNY/Grade 1/Module 1',
        name: 'Lesson 2',
        url: 'https://www.engageny.org/file/37331/download/math-g1-m1-topic-a-lesson-2.pdf?token=1JextzPW',
        status: 'unprocessed',
        notes: [],
        keywords: [],
        standards: [],
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

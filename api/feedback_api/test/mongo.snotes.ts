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

describe('MongoHelper Assignment tests', () => {
  test('TestAssigns', async () => {
  // Here we create or update 10 documents in the feedback database in the snotes
  try {
    const collection = mongo.db('feedback').collection('assignments');
    const promises: Array<Promise<any>> = [];

    const data_betty = {
      idx: '9789e990-d92b-2935-56f5-811ae96e84c1',
      assignment_idx: '8a1244ee-87d2-0fb1-2eae-13f0cbe7c62c',
      title: 'Multiplying Doubles',
      student: 'Betty White',
      url: './multiplying_doubles-Betty_White-1.png',
    };
    const promise_betty = collection.updateOne(
      { idx: '9789e990-d92b-2935-56f5-811ae96e84c1' },
      { $set: data_betty },
      { upsert: true },
    );
    promises.push(promise_betty);

    const data_lauryn = {
      idx: '9789e990-d92b-2935-56f5-811ae96e84c0',
      assignment_idx: '8a1244ee-87d2-0fb1-2eae-13f0cbe7c62c',
      title: 'Multiplying Doubles',
      student: 'Lauryn Hill',
      url: './multiplying_doubles-Lauryn_Hill-1.png',
    };
    const promise_lauryn = collection.updateOne(
      { idx: '9789e990-d92b-2935-56f5-811ae96e84c0' },
      { $set: data_lauryn },
      { upsert: true },
    );
    promises.push(promise_lauryn);

    const data_billy = {
      idx: 'db0495dc-f067-6b4c-9b4d-32d107af04e2',
      assignment_idx: '8a1244ee-87d2-0fb1-2eae-13f0cbe7c62c',
      title: 'Multiplying Doubles',
      student: 'Billy Madison',
      url: './multiplying_doubles-Billy_Madison-1.png',
    };
    const promise_billy = collection.updateOne(
      { idx: 'db0495dc-f067-6b4c-9b4d-32d107af04e2' },
      { $set: data_billy },
      { upsert: true },
    );
    promises.push(promise_billy);

    const data_jeff = {
      idx: '5a90d3f3-0683-0cbf-8394-3c056d5fdccb',
      assignment_idx: '8a1244ee-87d2-0fb1-2eae-13f0cbe7c62c',
      title: 'Multiplying Doubles',
      student: 'Jeff Spicoli',
      url: './multiplying_doubles-Jeff_Spicoli-1.png',
    };
    const promise_jeff = collection.updateOne(
      { idx: '5a90d3f3-0683-0cbf-8394-3c056d5fdccb' },
      { $set: data_jeff },
      { upsert: true },
    );
    promises.push(promise_jeff);

    const data_mclovin = {
      idx: 'f90e0aa4-c972-07fd-caf4-4161c260c375',
      assignment_idx: '8a1244ee-87d2-0fb1-2eae-13f0cbe7c62c',
      title: 'Multiplying Doubles',
      student: 'McLovin',
      url: './multiplying_doubles-McLovin-1.png',
    };
    const promise_mclovin = collection.updateOne(
      { idx: 'f90e0aa4-c972-07fd-caf4-4161c260c375' },
      { $set: data_mclovin },
      { upsert: true },
    );
    promises.push(promise_mclovin);

    const rval = await Promise.all(promises);
    logger.info(rval);
    logger.info('Done');
    return;
  } catch (e) {
    logger.error('Unexpected Exception TestWrite', e);
  }
});

});

describe('MongoHelper Sticky Note tests', () => {
    test('TestSnotes', async () => {
    // Here we create or update 10 documents in the feedback database in the snotes
    try {
      const collection = await mongo.db('feedback').collection('snotes');
      const promises: Array<Promise<any>> = [];
      for (let i = 0; i < 10; ++i) {
        const rand_note = new random_snote();
        const rand_idx = rand_note.get_idx();
        const docs = await mongo.db('feedback').collection('assignments').find().toArray();
        const content_idx = docs[ i % docs.length ].idx; // should give each content 2 sticky notes
        const data = {
          idx: rand_idx,
          author: rand_note.random_name(),
          content: rand_note.random_content(),
          type: 'snote',
          timestamp: rand_note.get_timestamp(),
          x: rand_note.random_x(),
          y: rand_note.random_y(),
          deleted: false,
          content_idx: content_idx,
        };
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

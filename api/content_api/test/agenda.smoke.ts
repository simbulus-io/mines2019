import { logger } from './logger_helper';
import { mongo_url } from '../src/helpers/mongo_helper';
import Agenda from 'agenda';



function a_short_async_job(job: any, done: any) {
  setTimeout(() => {
    console.log('this job is groovy');
    done();
  }, 1000);
}

export const agenda = new Agenda({ db: {address: mongo_url} });
agenda.define('My First Job', a_short_async_job);

describe('AgendaHelper smoke tests', () => {
    test('TestAgenda', async () => {
      (async function() { // IIFE to give access to async/await
        rval = await agenda.start();
        await agenda.now('My First Job');
      })();
    });
});

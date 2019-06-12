
import * as logger   from 'winston';
import Agenda from 'agenda';
import { mongo_url } from './mongo_helper';

export const agenda = new Agenda({ db: {address: mongo_url} });

function a_short_async_job(job: any, done: any) {
  setTimeout(() => {
    logger.info('this async job is groovy');
    done();
  }, 1000);
}

function a_short_sync_job(job: any, done: any) {
  logger.info('this sync job is groovy');
}

agenda.define('Job 1', a_short_async_job);
agenda.define('Job 2', a_short_sync_job);

(async function() { // IIFE to give access to async/await
try {
  await agenda.start();
  await agenda.every('10 seconds', 'Job 1');
  await agenda.every('10 seconds', 'Job 2');
} catch (e) {
  logger.error(e);
}
})();
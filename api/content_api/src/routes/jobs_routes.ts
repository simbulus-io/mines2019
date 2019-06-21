import _                 from 'lodash';
import * as logger       from 'winston';
import { Guid }          from 'guid-typescript';
import { Router }        from 'express';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

import { RoutesBase }    from './routes_base';
// schema
import { JobInput }      from '../jobs';

const CONTENT_DB                  = 'content';
const JOBS_COLL                   = 'jobs';
const JOBS_CACHED_RESULTS_COLL    = 'jobs_cached_results';

export class JobsRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ///////Get the file from the app and perpetuate in mongo//////
    router.post(`${RoutesBase.API_BASE_URL}/job/schedule`, async (req, res) => {
      try {
        const payload = req.body;
        res.setHeader('Content-Type', 'application/json');
        // validate input (post payload)
        const valid = true || JobInput.is(payload);
        if (valid) {
          const mongo = req.app.get('mongo');
          // generated job id
          const job = { ...payload, job_id: Guid.raw(), status: 'new', log: '', result: {}};
          // push to mongo
          const doc = await mongo.db(CONTENT_DB).collection(JOBS_COLL)
            .updateOne({job_id: job.job_id},    // index
                       {$set:   job},           // write concern
                       {upsert: true});         // create if index doesn't exist
          // return  job_id
          res.json({status: 0, job_id: job.job_id});
        } else {
          const result = JobInput.decode(payload);
          // Use a reporter to throw an error if validation fails
          ThrowReporter.report(result);
        }
      } catch (e) {
        const msg = `Unexpected Error in job/schedule:\n ${e}`
        logger.error(new Error(msg));
        res.json({status: -1, error: msg});
        res.status(422);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/job/results`, async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const mongo = req.app.get('mongo');
        const jobs = await mongo.db(CONTENT_DB)
          .collection(JOBS_COLL).find({...req.query, status: 'finished'}).toArray();
        res.json(_.map(jobs, j => _.omit(j, '_id')));
      } catch (e) {
        logger.error(new Error(`Unexpected Error in job/results:\n ${e}`));
        res.json({status: false});
        res.status(422);
      }
    });


    router.get(`${RoutesBase.API_BASE_URL}/job/jobs`, async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const mongo = req.app.get('mongo');
        const job_id = req.query.job_id;
        if (job_id) {
          const job = await mongo.db(CONTENT_DB).collection(JOBS_COLL).findOne({ job_id });
          res.json(job);
        } else {
          const jobs = await mongo.db(CONTENT_DB).collection(JOBS_COLL).find().toArray();
          res.json(_.map(jobs, j => _.omit(j, '_id')));
        }
      } catch (e) {
        logger.error(new Error(`Unexpected Error in job/results:\n ${e}`));
        res.json({status: false});
        res.status(422);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/job/cache`, async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const mongo = req.app.get('mongo');
        const key = req.query.key;
        if (key) {
          const job = await mongo.db(CONTENT_DB).collection(JOBS_CACHED_RESULTS_COLL).findOne({ key });
          res.json(job);
        }
      } catch (e) {
        logger.error(new Error(`Unexpected Error in job/cache:\n ${e}`));
        res.json({status: false});
        res.status(422);
      }
    });

    router.post(`${RoutesBase.API_BASE_URL}/job/cache`, async (req, res) => {
      try {
        res.setHeader('Content-Type', 'application/json');
        const key = req.query.key;
        const payload = req.body;
        if (key && payload) {
          const mongo = req.app.get('mongo');
          // push to mongo
          const doc = await mongo.db(CONTENT_DB).collection(JOBS_CACHED_RESULTS_COLL)
            .updateOne({key},                   // index
                       {$set:   payload},       // write concern
                       {upsert: true});         // create if index doesn't exist
          res.json({status: 0});
        } else {
          const msg = `Unexpected to process job/cache`
          logger.error(new Error(msg));
          res.json({status: -1, error: msg});
          res.status(422);
        }
      } catch (e) {
        const msg = `Unexpected Error in job/cache:\n ${e}`;
        logger.error(new Error(msg));
        res.json({status: -1, error: msg});
        res.status(422);
      }

    });

  }

}

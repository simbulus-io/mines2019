import _                 from 'lodash';
import * as logger       from 'winston';
import { Guid }          from 'guid-typescript';
import { Router }        from 'express';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

import { RoutesBase }    from './routes_base';
// schema
import { JobInput }      from '../jobs';

const CONTENT_DB   = 'content';
const JOBS_COLL    = 'jobs';
const RESULTS_COLL = 'results';

export class JobsRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ///////Get the file from the app and perpetuate in mongo//////
    router.post(`${RoutesBase.API_BASE_URL}/job/schedule`, async (req, res) => {
      try {
        const payload = req.body;
        res.setHeader('Content-Type', 'application/json');
        // validate input (post payload)
        const valid = JobInput.is(payload);
        if (valid) {
          const mongo = req.app.get('mongo');
          // generated job id
          const job = { ...payload, job_id: Guid.raw() };
          // push to mongo
          const doc = await mongo.db(CONTENT_DB).collection(JOBS_COLL)
            .updateOne({job_id: job.job_id},    // index
                       {$set:   job},           // write concern
                       {upsert: true});         // create if index doesn't exist
          // return  job_id
          res.json({status: true, job_id: job.id});
        } else {
          const result = JobInput.decode(payload);
          // Use a reporter to throw an error if validation fails
          ThrowReporter.report(result);
        }
      } catch (e) {
        logger.error(new Error(`Unexpected Error in job/schedule:\n ${e}`));
        res.json({status: false});
        res.status(422);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/job/results`, async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const mongo = req.app.get('mongo');
        const job_id = req.query.job_id;
        if (job_id) {
          const job = await mongo.db(CONTENT_DB).collection(RESULTS_COLL).findOne({ job_id });
          res.json(job);
        } else {
          const jobs = await mongo.db(CONTENT_DB).collection(RESULTS_COLL).find().toArray();
          res.json(_.map(jobs, j => _.omit(j, '_id')));
        }
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

  }

}

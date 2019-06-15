import * as logger       from 'winston';
import { Guid }          from 'guid-typescript';
import { Router }        from 'express';

import { RoutesBase }    from './routes_base';
// schema
import { Job, JobInput } from '../jobs';

const CONTENT_DB   = 'content';
const JOBS_COLL    = 'jobs';
const RESULTS_COLL = 'results';

export class JobsRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ///////Get the file from the app and perpetuate in mongo//////
    router.post(`${RoutesBase.API_BASE_URL}/schedule_job`, async (req, res) => {
      try {
        const payload = req.body;
        res.setHeader('Content-Type', 'application/json');
        // validate input (post payload)
        const valid = JobInput.is(payload);
        if (valid) {
          const mongo = req.app.get('mongo');
          // generated job id
          const job_id = Guid.raw();
          // validate job
          const job = { ...payload, id: job_id };
          if (!Job.is(job) ) {
             const violation = logger.info(JSON.stringify(Job.decode(job), null, 2));
             throw new Error('SchemaViolation');
          }
          // push to mongo
          const doc = await mongo.db(CONTENT_DB).collection(JOBS_COLL)
            .updateOne({id: job_id},    // index
                       {$set: job},     // write concern
                       {upsert: true}); // create if index doesn't exist

            // return  job_id
          res.json({status: true, job_id: job_id});
        } else {
          throw new Error('InvalidPayload');
        }
      } catch (e) {
        logger.error(new Error(`Unexpected Error in schedule_job: ${e}`));
        res.json({status: false});
        res.status(422);
      }
    });


  }

}

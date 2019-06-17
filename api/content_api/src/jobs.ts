  // tslint:disable: variable-name
import * as t         from 'io-ts';

// JobInput Schema

// The syntax for combining objects with required and optional keys is
// complicated ... we'll end up punting this lib or using a helper
// so keep in mind that the below simply states that the values
// can be undefined not that the keys are missing from the payload

export const JobInput = t.type({
  command: t.string,                            // required. See .../python-coproc/app.py for list
  args:    t.union([t.object , t.undefined]),   // optional but commands usually require specific args
  name:    t.union([t.string , t.undefined]),   // optional: job name (job_id guid added regardless)
  dir:     t.union([t.string , t.undefined]),   // optional: directory to create and set as working dir.
                                                // if not set, dir defaults to (name || job_id)
  //timeout: t.union([t.string , t.undefined]), // optional: in seconds. NOT YET IMPLEMENTED
});

// JobID Schema
export const JobID = t.type({
  job_id: t.string,
});

// Job Schema
export const Job = t.union([JobInput, JobID]);



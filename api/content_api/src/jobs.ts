  // tslint:disable: variable-name
import * as t         from 'io-ts';
import { tsAnyKeyword } from '@babel/types';

// JobInput Schema

export const JobInputOptional = t.partial({
  timeout: t.string,
  args:    t.object,   // optional but commands usually require specific args
  name:    t.string,   // optional: job name (job_id guid added regardless)
  dir:     t.string,   // optional: create and set as working dir - defaults to (name || job_id)
});

export const JobInputRequired = t.type({
  command: t.string,   // required. See .../python-coproc/app.py for list
});

// This is the syntax for creating an object with combined optional and required
// keys -- t.optional is in the works but apparently has some complications
// associated its implementation -- until then..
export const JobInput = t.intersection([JobInputRequired, JobInputRequired]);

// JobID Schema
export const JobID = t.type({
  job_id: t.string,
});

// Job Schema
export const Job = t.union([JobInput, JobID]);



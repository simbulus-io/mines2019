  // tslint:disable: variable-name
import * as t         from 'io-ts';
import { tsAnyKeyword } from '@babel/types';

// JobInput Schema

export const JobInputOptional = t.partial({
  args:    t.object,   // optional but commands usually require specific args
  dir:     t.string,   // optional: create and set as working dir - defaults to (name || job_id)
  name:    t.string,   // optional: job name (job_id guid added regardless)
  timeout: t.number,   // optional: job timeout in seconds; defaults to 60.0
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



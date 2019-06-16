  // tslint:disable: variable-name
import * as t         from 'io-ts';

// JobInput Schema
export const JobInput = t.type({
  name: t.string,
  command: t.string,
  args: t.union([t.object , t.undefined]),
});

// JobID Schema
export const JobID = t.type({
  job_id: t.string,
});

// Job Schema
export const Job = t.union([JobInput, JobID]);


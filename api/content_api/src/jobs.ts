  // tslint:disable: variable-name
import * as t         from 'io-ts';

// JobInput Schema
export const JobInput = t.type({
  name: t.string,
});

// JobID Schema
export const JobID = t.type({
  id: t.string,
});

// Job Schema
export const Job = t.union([JobInput, JobID]);



/* tslint:disable:prefer-const */
import { log, puts }  from '@/logger';
import asyncPoll      from '@/async_poll';
import { BlobCache }  from '@/blob_cache'

const USING_DOCKER = false;
const API = USING_DOCKER ? 'http://localhost/content/v1.0' :  'http://localhost:5101/content/v1.0'

// BlobCache client gets initialized with BlobCache API URL
const blob_cache = new BlobCache({url: `${API}/job/cache`});

const rpc = async (job:any): Promise<any | null>  => {
  const sec = 1e3;
  const polling_interval = 2*sec;
  const rpc_timeout      = 80*sec;

  const cached_result = await blob_cache.get(job);
  if(cached_result) {
    log.info(`cache hit for job ${JSON.stringify(job)}`);
    return cached_result;
  } else {
    log.info(`cache miss for job ${JSON.stringify(job)}`);
  }

  try {
    const hresp = await fetch(`${API}/job/schedule`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job)
    });
    const response = await hresp.json();
    const { status, job_id } = response;
    if(response.status!==0){
      log.error('error scheduling job with api');
      log.error({job , response});
      return;
    }
    puts(`created remote processing job with job_id = ${job_id}`);
    await new Promise(r => setTimeout(r, 0.5*sec)); // pause a beat to let job possibly get picked up
    const polling_url      = `${API}/job/results?job_id=${job_id}`
    // const poll_fn = async () => fetch(polling_url).then(r => r.json());
    const poll_fn = async () => fetch(polling_url).then(async function(r) {const j= await r.json(); return j[0];});
    const condition_fn = (d: any) => d && ('status' in d) && (d.status === 'finished');
    const finished_job = await asyncPoll<any>(poll_fn, condition_fn, {interval: polling_interval, timeout: rpc_timeout});
    let result:any = null;
    if  (finished_job && ('result' in finished_job)) {
      result = finished_job.result;
    }
    if (!rpc_job_succeeded(finished_job)) {
      puts(`Got error returned from job with job_id: ${finished_job.job_id},` +
           ` command: ${finished_job.command}, error_message: ${rpc_job_error_string(finished_job)}` );
    } else {
      // only cache if no error
      await blob_cache.set(job, finished_job);
    }
    return finished_job;
  } catch( e) {
    log.error(e);
    return null;
  }
}

const rpc_job_succeeded = (r:any):boolean => r && ('result' in r) && ('status' in r.result) && (0===r.result.status)

const rpc_job_error_string = function(r:any):(string | null) {
  if (r && ('result' in r) && ('error' in r.result)) return r.result.error;
  return null;
}


const rpc_sequential = async (jobs:Array<any>, continue_after_error:boolean):Promise<any> => {
  let results:Array<any> = [];
  for (let j of jobs) {
    let r = await rpc(j);
    results.push(r)
    if (!continue_after_error && !rpc_job_succeeded(r)) break
  }
  return results;
}

const rpc_parallel = async (jobs:Array<any>):Promise<Array<any>> => {
  let promises:Array<Promise<any>> = [];
  for (let j of jobs) {promises.push(rpc(j));}
  const results = await Promise.all(promises);
  return results;
}

export { rpc, rpc_sequential, rpc_parallel, rpc_job_succeeded, rpc_job_error_string };

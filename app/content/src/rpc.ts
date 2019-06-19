/* tslint:disable:prefer-const */
import { log, puts }  from '@/logger';
import asyncPoll      from '@/async_poll'; // Had to hack this up to work in the browser


const USING_DOCKER = true;
const API = USING_DOCKER ? 'http://localhost/content/v1.0' :  'http://localhost:5101/content/v1.0'

const rpc = async (job:any) => {
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
    const polling_url = `${API}/job/results?job_id=${job_id}`
    const sec = 1e3;
    await new Promise(r => setTimeout(r, 0.5*sec))
    // const poll_fn = async () => fetch(polling_url).then(r => r.json());
    const poll_fn = async () => fetch(polling_url).then(async function(r) {const j= await r.json(); return j[0];});
    const condition_fn = (d: any) => d && ('status' in d) && (d.status === 'finished');
    const interval = 2*sec;
    const timeout = 30*sec;
    const finished_job = await asyncPoll<any>(poll_fn, condition_fn, {interval, timeout});
    let result:any = null;
    if  (finished_job && ('result' in finished_job)) {
      result = finished_job['result']
    }
    if (result && ('status' in result) && result.status!== 0) {
      let error = '<none>'
      if ('error' in result) {error = result.error;}
      puts(`Got error returned from job with job_id: ${finished_job.job_id},` +
           ` command: ${finished_job.command}, error_message: ${error}` );
    }
    return finished_job;
  } catch( e) {
    log.error(e);
  }
}

const rpc_job_succeeded = (r:any) => r && ('result' in r) && ('status' in r.result) && (0===r.result.status)

const rpc_sequential = async (jobs:Array<any>, continue_after_error:boolean) => {
  let results:Array<any> = [];
  for (let j of jobs) {
    let r = await rpc(j);
    results.push(r)
    if (!continue_after_error && !rpc_job_succeeded(r)) break
  }
  return results;
}

const rpc_parallel = async (jobs:Array<any>) => {
  let promises:Array<Promise<any>> = [];
  for (let j of jobs) {promises.push(rpc(j));}
  const results = await Promise.all(promises);
  return results;
}

export { rpc, rpc_sequential, rpc_parallel, rpc_job_succeeded };

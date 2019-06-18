import { log, puts }  from '@/logger';
import asyncPoll      from '@/async_poll';

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
        puts(`response = ${JSON.stringify(response)}`);
        if(response.status!==0){
            log.error('error scheduling job with api');
            log.error({job , response});
            return;
        }
        puts(`job_id = ${job_id}`);
        const polling_url = `${API}/job/results?job_id=${job_id}`
        const sec = 1e3;
        await new Promise(r => setTimeout(r, 0.5*sec))
        // const poll_fn = async () => fetch(polling_url).then(r => r.json());
        const poll_fn = async () => fetch(polling_url).then(async function(r) {const j= await r.json(); return j[0];});
        const condition_fn = (d: any) => d && ('status' in d) && (d.status === 'finished');
        const interval = 2*sec;
        const timeout = 30*sec;
        const result = await asyncPoll<any>(poll_fn, condition_fn, {interval, timeout});
        return result;
    } catch( e) {
        log.error(e);
    }
}

const rpc_sequential = async (jobs:any[], continue_after_error:boolean) => {
    let results = [];
    for (j in jobs) {
        r = await rpj(j);
        results.push(r)
        let ok = r && ('result' in r) && ('status' in r.result) && (0===r.result.status)
        if (!continue_after_error && !ok) break
    }
    return results;
}

const rpc_parallel = async (jobs:any[]) => {
    let promises = [];
    for (j in jobs) {promises.push(rpj(j));}
    const results = await Promise.all(promises);
    return results;
}

export { rpc, rpc_sequential, rpc_parallel };

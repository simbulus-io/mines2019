import { log, puts }  from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';
// Had to hack this up to work in the browser
import { rpc }        from '@/rpc';

const USING_DOCKER = true;
// const API_BASE_URL = USING_DOCKER ? 'http://localhost' :  'http://localhost:5101'
const API = USING_DOCKER ? 'http://localhost/content/v1.0' :  'http://localhost:5101/content/v1.0'

export interface ContentState {
  hello: string;
  test_array: any[];
  test_array_2: any[];
  test_image: string;
}

export const content_state: ContentState = {
  hello: 'Hello Mines 2019 Field Session',
  test_array: [],
  test_array_2: [],
  test_image: 'this is the url',
}

const namespaced: boolean = true;

export const content: Module<ContentState, RootState> = {
  namespaced,
  state: content_state,
  mutations: {
    hello: (state: any, message: any) => {
      state.hello  = message;
    },
    test_array: (state: any, data: any) => {
      state.test_array = data;
    },
    test_array_2: (state: any, data: any) => {
      state.test_array_2 = data;
    },

    test_image: (state: any, message: any) => {
      state.test_image = message;
    },
  },
  // These are asynchronus actions - model interactions with a server
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch(`${API}/hello`)
      const state = await rval.json();
      puts(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },
    ingest_url: async (context:any , args:any) => {
      // try {
        const job = {
          name: 'A Job',
          command: 'fetch_content',
          dir: 'ingested_files',
          args: {
            url: args.url
          }
        };
        puts(job);
        const result = await rpc(job);
        puts('= = = = Got Result from Job Coproc: = = = =');
        puts(result);
        puts('= = = = = = = = = = = = = = = = = = = = = = ');
        return result;
        // const hresp = await fetch(`${API}/job/schedule`,{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(job)
        // });
        // const resp = await hresp.json();
        // const { status, job_id } = resp; 
        // puts(`resp=${resp}`);
        // if(resp.status!==0){
        //     log.error('error scheduling job with api');
        //     log.error({job: payload, response: resp});
        //     return;
        // }
        // puts(`job_id = ${job_id}`);
        // const polling_url = `${API}/job/results?job_id=${job_id}`
        // puts(`polling_url = ${polling_url}`);
        // puts(`zzz`);
        // // await new Promise(r => setTimeout(r, 1000))
        // puts(`polling`);
        // // const poll_fn = async () => fetch(polling_url).then(r => r.json());
        // const poll_fn = async () => fetch(polling_url).then(async function(r) {const j= await r.json(); puts(j[0]); return j[0];});
        // const condition_fn = (d: any) => d && ('status' in d) && (d.status === 'finished');
        // //  const condition_fn = function(d: any) {puts(d); puts(d.status); return d.status === 'finished'};
        // const sec = 1e3;
        // const interval = 2*sec;
        // const timeout = 30*sec;
        // const result = await asyncPoll<any>(poll_fn, condition_fn, {interval, timeout});
        // puts('= = = = Got Result from Job Coproc = = = =');
        // puts(result);
        // return result;
        // } catch( e) {
        //   log.error(e);
        // }
    },
    test_array: async (context:any , arg: any) => {
      try {
        const rval = await fetch(`${API}/contents`)
        const state = await rval.json();
        // upon successfully completing the action - synchronusly update the Vue application state
        // via a mutator via the commit call
        context.commit('test_array', state.docs);
      } catch(e) {
        log.error(e);
      }
    },

    test_array_2: async (context:any , arg: any) => {
      try {
        const rval = await fetch(`${API}/test_route`)
        const state = await rval.json();
        // upon successfully completing the action - synchronusly update the Vue application state
        // via a mutator via the commit call
        context.commit('test_array_2', state.docs);
      } catch(e) {
        log.error(e);
      }
    },


    //////this links to the route serving static files from test_routes.ts
    //////TODO: parameterize the url passed to fetch() so that any file in public can be called by name
    test_image: async (context:any , arg: any) => {
      try {
        const rval = await fetch(`${API}/static/Algebra.png`)
        const img = await rval.blob();
        const state = URL.createObjectURL(img);
        // upon successfully completing the action - synchronusly update the Vue application state
        // via a mutator via the commit call
        context.commit('test_image', state);
      } catch(e) {
        log.error(e);
      }
    },
  }
};

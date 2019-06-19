/* tslint:disable:prefer-const */
import { log, puts }  from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';
import { rpc , rpc_job_succeeded } from '@/rpc';

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
        let job = {
          name: 'A Job',
          command: 'fetch_content',
          dir: 'ingested_files',
          args: {
            url: args.url
          }
        };
        let jout = await rpc(job);
        puts({job, jout});
        if (!rpc_job_succeeded(jout)) {
            return jout;
        }
        const hash = jout.result.md5.substr(0,12);
        job.dir = hash;
        jout = await rpc(job);
        puts({job, jout});
        const job2 = {
          name: 'A Second Job',
          command: 'pdf_to_image',
          dir: hash,
          args: {
           'src'       :  jout.result.fname,
           'crop_rect' : [0.0, 0.0, 1.0, 1.0],
           'dpi'       : 30,
           'pages'     : '1',
          }
        };
        let jout2 = await rpc(job2);
        puts('= = = = Got Result from Job Coproc: = = = =');
        puts({job2, jout2});
        puts('= = = = = = = = = = = = = = = = = = = = = = ');
        return jout2;
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

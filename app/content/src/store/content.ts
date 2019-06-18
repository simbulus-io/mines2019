import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';
import { __await } from 'tslib';

const USING_DOCKER = true;
const API_BASE_URL = USING_DOCKER ? 'http://localhost' :  'http://localhost:5101'

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
      const rval = await fetch(`${API_BASE_URL}/content/v1.0/hello`)
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },
    ingest_url: async (context:any , args:any) => {
      try {
        const payload = {
          name: 'A Job',
          command: 'fetch_content',
          dir: 'ingested_files',
          args: {
            url: args.url
          }
        }
        const rval = await fetch(`${API_BASE_URL}/content/v1.0/job/schedule`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        const response = await rval.json();
        log.info(response);
        // if(response.job_id) {
        //   const i = 0;
        //   // poll every second
        //   const poller = setInterval(async () => {
        //     const rval = await fetch(`${API_BASE_URL}/content/v1.0/job/result?job_id=${response.job_id}`);
        //   }, 1000);
        // }
      } catch( e) {
        log.error(e);
      }
    },
    test_array: async (context:any , arg: any) => {
      try {
        const rval = await fetch(`${API_BASE_URL}/content/v1.0/contents`)
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
        const rval = await fetch(`${API_BASE_URL}/CONTENT/v1.0/test_route`)
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
        const rval = await fetch(`${API_BASE_URL}/content/v1.0/static/Algebra.png`)
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

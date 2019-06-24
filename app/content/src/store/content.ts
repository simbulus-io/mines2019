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
      const hash = jout.result.md5.substr(0,11);
      job.dir = hash;
      jout = await rpc(job);
      puts({job, jout});
      const job2 = {
        name: 'A Second Job',
        command: 'pdf_to_image',
        timeout: 75,
        dir: `${hash}/pg_thumbs`,
        args: {
          'src'         :  `../${jout.result.fname}`,
          'crop_rect'   : [0.0, 0.0, 1.0, 1.0],
          'dpi'         : 30,
          'pages'       : '-',
          'concatenate' : false,
        }
      };
      let jout2 = await rpc(job2);
      puts({job2, jout2});
      jout2.result.hash = hash;
      return jout2;
    },
    process_pdf: async (context:any , args:any) => {
      let dpi=108;
      const job = {
        command: 'pdf_to_image',
        timeout: 75,
        dir: `${args.hash}`,
        args: {
          'src'         :  args.src,
          'tgt'         :  `${args.hash}-${dpi}d.png`,
          'crop_rect'   : [0.03, 0.10, 0.93, 0.90],
          'dpi'         : dpi,
          'pages'       : args.page_list,
          'concatenate' : true,
        }
      };

      let jout = await rpc(job);
      puts({job, jout});
      if (!rpc_job_succeeded(jout)) {
        jout.summary = {};
        return jout;
      }
      const lo_res:string = jout.result.path;

      const job2 = {
        'command': 'y_segment_image',
        dir: `${args.hash}`,
        timeout: 75,
        'args': {
          'file' :  `${args.hash}-${dpi}d.png`,
        }};

      let jout2 = await rpc(job2);
      puts({job2, jout2});
      if (!rpc_job_succeeded(jout2)) {
        jout2.summary = {};
        return jout2;
      }
      const white_space_rows:Array<Array<number>> = jout2.result.white_space_rows;
      
      dpi = 2*108;
      job.args.dpi = dpi;
      job.args.tgt = `${args.hash}-${dpi}d.png`;
      let jout3 = await rpc(job);
      puts({job, jout3:jout3});
      if (!rpc_job_succeeded(jout2)) {
        jout3.summary = {};
        return jout3;
      }
      const hi_res:string = jout3.result.path;
      jout3.summary = {image: lo_res, hi_res, white_space_rows, dpi: 108, image_shape: jout.result.image_shape};
      puts(jout3.summary);
      return jout3;
    },
    compose_images: async (context:any , args:any) => {
      let job = {
        name: 'A Job',
        command: 'compose_images',
        dir: `${args.hash}/task_imgs`,
        args: {
          'source'      : [null, '../'+args.src],
          'tgt_fmt'     : `%02d.png`,
          'sequence'    : args.sequence,
        }
      };
      let jout = await rpc(job);
      puts({job, jout});
      return jout;
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

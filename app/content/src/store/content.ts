/* tslint:disable:prefer-const */
import { log, puts }               from '@/logger';
import { Module }                  from 'vuex';
import { RootState }               from '@/store/types';
import Vue                         from 'vue';
import Vuex                        from 'vuex';
import { rpc , rpc_job_succeeded } from '@/rpc';
import { API_BASE_URL }                 from '@/config';
import { getUnpackedSettings }     from 'http2';
import { Lesson }                  from '@/components/lesson';

export interface ContentState {
  hello: string;
  content_selection: string;
  //content_providers: any[];
  content_lessons: Lesson[];
}

export const content_state: ContentState = {
  hello: 'Hello Mines 2019 Field Session',
  content_selection: '',
  //content_providers: [],
  content_lessons: [],
}

const namespaced: boolean = true;

export const content: Module<ContentState, RootState> = {
  namespaced,
  state: content_state,
  mutations: {
    hello: (state: any, message: any) => {
      state.hello  = message;
    },
    content_selection: (state: any, new_value: string) => {
      state.content_selection  = new_value;
    },
    content_lessons: (state: any, message: any) => {
      state.content_lessons  = message;
    },
    update_lesson_keywords: (state: any, args: any) => {
      const index = state.content_lessons.findIndex(less => less._id === args._id );
      const lesson = state.content_lessons[index];
      lesson.keywords = args.keywords;
      Vue.set(state.content_lessons,index,lesson);
    },
    update_lesson_note: (state: any, args: any) => {
      const index = state.content_lessons.findIndex(less => less._id === args._id );
      const lesson = state.content_lessons[index];
      const note_index = args.note_index;
      lesson.notes[note_index] = args.text;
      Vue.set(state.content_lessons,index,lesson);
    },
    delete_lesson_note: (state: any, args: any) => {
      const index = state.content_lessons.findIndex(less => less._id === args._id );
      const lesson = state.content_lessons[index];
      const note_index = args.note_index;
      lesson.notes.splice(note_index, 1);
      Vue.set(state.content_lessons,index,lesson);
    },
    add_lesson_note: (state: any, args: any) => {
      const index = state.content_lessons.findIndex(less => less._id === args._id );
      const lesson = state.content_lessons[index];
      lesson.notes.push('');
      Vue.set(state.content_lessons,index,lesson);
    },
    update_lesson_status: (state: any, args: any) => {
      const index = state.content_lessons.findIndex(less => less._id === args._id );
      const lesson = state.content_lessons[index];
      lesson.status = args.status;
      Vue.set(state.content_lessons,index,lesson);
    },
  },
  // These are asynchronus actions - model interactions with a server
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch(`${API_BASE_URL}/hello`)
      const state = await rval.json();
      puts(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },
    content_selection: async (context: any, new_value: string) => {
      context.commit('content_selection', new_value);
    },
    content_lessons: async (context: any, args: any) => {
      const rval = await fetch(`${API_BASE_URL}/lessons`)
      const state = await rval.json();
      puts(`In content_lessons got ${state.message} from the server`);
      context.commit('content_lessons', state.message);
    },
    update_lesson_keywords:  async (context: any, args: any) => {
      const json_body = JSON.stringify(args);
      //log.info(json_body);
      const url = `${API_BASE_URL}/update_lesson/keywords`;
      const rval = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json_body
      });
      const state = await rval.json();
      puts(`In update_lesson_keywords got ${state.message} from the server`);
      context.commit('update_lesson_keywords', args);
    },
    update_lesson_note:  async (context: any, args: any) => {
      const url = `${API_BASE_URL}/update_lesson/update_note`;
      const json_body = JSON.stringify(args);
      const rval = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: json_body
      });
      const state = await rval.json();
      puts(`In update_lesson_note got ${state.message} from the server`);
      context.commit('update_lesson_note', args);
    },
    delete_lesson_note:  async (context: any, args: any) => {
      let query_string = `?_id=${args._id}&note_index=${args.note_index}`;
      log.info(query_string);
      const url = `${API_BASE_URL}/update_lesson/delete_note${query_string}`;
      const rval = await fetch(url)
      const state = await rval.json();
      puts(`In delete_lesson_note got ${state.message} from the server`);
      context.commit('delete_lesson_note', args);
    },
    add_lesson_note:  async (context: any, args: any) => {
      let query_string = `?_id=${args._id}`;
      log.info(query_string);
      const url = `${API_BASE_URL}/update_lesson/add_note${query_string}`;
      const rval = await fetch(url)
      const state = await rval.json();
      puts(`In add_lesson_note got ${state.message} from the server`);
      const params = {
        _id: args._id,
      }
      context.commit('add_lesson_note', params);
    },
    update_lesson_status:  async (context: any, args: any) => {
      let query_string = `?_id=${args._id}&status=${args.status}`;
      log.info(query_string);
      const url = `${API_BASE_URL}/update_lesson/status${query_string}`;
      const rval = await fetch(url)
      const state = await rval.json();
      puts(`In update_lesson_status got ${state.message} from the server`);
      context.commit('update_lesson_status', args);
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
      // TODO: sk... two things I'm not sure about...
      // 1. How much logic should live here in content.ts vs in the component controllers.
      // 2. How I should reduce some of the redundant code here in the way jobs are run;
      //    I think maybe we should have some sort of Jobs class or typedef and perhaps,
      //    derived types for each command (?). E.g. in the code below, both the first and
      //    the third job are calling pdf_to_image in similar ways.
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

  }
};

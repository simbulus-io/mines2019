import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';

export interface FeedbackState {
  hello: string;
}

export const feedback_state: FeedbackState = {
  hello: 'Hello Mines 2019 Field Session',
}

const namespaced: boolean = true;

export const feedback: Module<FeedbackState, RootState> = {
  namespaced,
  state: feedback_state,
  mutations: {
    hello: (state: any, message: any) => {
      state.hello  = message;
    },
    // referenced by the other.ts file
    al: (state: any,message:any) => {
      state.al = message;
    },
    // Attempt to give the database to the feedback_api
    view_names: (state: any,message:any) => {
      state.view_names = message;
      
    }
  },
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/feedback/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },

    // Portion referenced by other.ts
    al: async (context: any, args: any) => {
      // references route defined in test_routes.ts::
      const rval = await fetch('http://localhost:5101/feedback/v1.0/al')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('al', state.message);
    },

    // Database attempt
    view_names: async (context: any, args: any) => {
      // references route defined in test_routes.ts::
      const rval = await fetch('http://localhost:5101/feedback/v1.0/view_names')
      const state = await rval.json();
      // log.info(`Got ${state.message} from the server`);
      context.commit('view_names', state.message);
    }
  }
};
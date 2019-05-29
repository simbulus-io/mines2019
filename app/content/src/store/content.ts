import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';

export interface ContentState {
  hello: string;
}

export const content_state: ContentState = {
  hello: 'Hello Mines 2019 Field Session',
}

const namespaced: boolean = true;

export const content: Module<ContentState, RootState> = {
  namespaced,
  state: content_state,
  mutations: {
    hello: (state: any, message: any) => {
      state.hello  = message;
    }
  },
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/content/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    }
  }
};

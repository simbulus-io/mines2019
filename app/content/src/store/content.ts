import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';

export interface ContentState {
  hello: string;
  test_array: any[];
  test_array_2: [];
}

export const content_state: ContentState = {
  hello: 'Hello Mines 2019 Field Session',
  test_array: [],
  test_array_2: [],
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
  },
  // These are asynchronus actions - model interactions with a server
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/content/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },
    
    test_array: async (context:any , arg: any) => {
      try {
        const rval = await fetch('http://localhost:5101/content/v1.0/contents')
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
        const rval = await fetch('http://localhost:5101/content/v1.0/test_route')
        const state = await rval.json();
        // upon successfully completing the action - synchronusly update the Vue application state
        // via a mutator via the commit call
        context.commit('test_array_2', state.docs);
      } catch(e) {
        log.error(e);
      }
    },
  }
};

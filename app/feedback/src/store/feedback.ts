import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';
import Snote from '@/components/snote';

// FeedbackState Interface
export interface FeedbackState {
  hello: string;
  // SK - filling in the missing interface definition
  // SK - when snote data assumes its final form suggest you define an interface
  // instead of using any[] here (e.g. Array<SNoteData>)
  snotes: any[];
}

// FeedbackState Default
const feedback_state: FeedbackState = {
  hello: 'Hello Mines 2019 Field Session',
  // SK - filling in the missing state
  snotes: [],
}

// SK - there is more state down here that needs to be propagated to
// the interface and default state above -- follow the example of snote
const namespaced: boolean = true;
export const feedback: Module<FeedbackState, RootState> = {
  namespaced,
  state: feedback_state,
  mutations: {
    hello: (state: any, message: any) => {
      state.hello  = message;
    },
    // snotes 5/29
    snotes: (state: any, snotes:any) => {
      state.snotes = snotes;
    },
    delete_snote: (state: any, snote:any) => {
      // SK - fat arrow funcs can skip parens and curly brackets & return
      // same as (note) => { return note.id === snote.id }
      // SK - *always* use === and !== in javascript/typescript
      const idx = state.snotes.findIndex(note => note.id === snote.id );
      // SK - you must use splice to delete for reactivity to work SK - T
      // SK - There is no operator overloading in JS/TS so methods to interact
      // with collections.
      // SK - (e.g. delete state.conferences[idx] --  is valid javascript but
      // won't trigger a reactive update - Vue + Language limitation)
      state.conferences.splice(idx,1);
    },
    // save_exit_snote: (state: any, snote:any) => {
    //   log.info('in feedback.ts in save_exit_snote');
    //   const idx = state.snotes.findIndex(note => note.id === snote.id );
    //   let to_change:Snote = state.snotes[idx];
    //   log.info('snote: '+state.snotes[idx].selected);
    //   log.info('to_change: '+to_change);
    //   to_change.selected = false;
    //   Vue.set(state.snotes, idx, to_change);
    // }
    // SK - put this back in when it is plumbed to FeedbackState
    // // referenced by the other.ts file
    // al: (state: any,message:any) => {
    //   state.al = message;
    // },
    // // Attempt to give the database to the feedback_api
    // view_names: (state: any,message:any) => {
    //   state.view_names = message;
    // },
  },
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/feedback/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },

    // SK - put this back in when it is plumbed to FeedbackState
    // // Portion referenced by other.ts
    // al: async (context: any, args: any) => {
    //   // references route defined in test_routes.ts::
    //   const rval = await fetch('http://localhost:5101/feedback/v1.0/al')
    //   const state = await rval.json();
    //   log.info(`Got ${state.message} from the server`);
    //   context.commit('al', state.message);
    // },

    // // Database attempt
    // view_names: async (context: any, args: any) => {
    //   // references route defined in test_routes.ts::
    //   const rval = await fetch('http://localhost:5101/feedback/v1.0/view_names')
    //   const state = await rval.json();
    //   // log.info(`Got ${state.message} from the server`);
    //   context.commit('view_names', state.message);
    // },

       // route to view all sticky notes (snotes)
    snotes: async (context: any, args: any) => {
      try {
        // references route defined in test_routes.ts::
        const rval = await fetch('http://localhost:5101/feedback/v1.0/snotes')
        const rval_json = await rval.json();
        log.info(`Got (all sticky notes) ${rval_json} from the server`);
        context.commit('snotes', rval_json.message);
      } catch(e) {
        log.error(e);
      }
    },

    delete_snote: async (context: any, idx: string) => { //idx: string
      try{
        log.info( 'Accessing route to delete a sticky' );
        // references route defined in test_routes.ts::
        const url = 'http://localhost:5101/feedback/v1.0/delete_snote?idx='+ idx; // + idx
        log.info('********** Getting url: ' + url );
        const rval = await fetch(url)
        log.info ( 'rvals type: ' +typeof(rval) );
        //const state = await rval.json();
        // log.info(`Got ${state.message} from the server`);
        context.commit('delete_snote', rval.body); // context.commit('delete_snote', state.message);
      } catch ( e ) {
        log.error(e.message);
      }
    }
  }
};
import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import Vuex           from 'vuex';
import Snote from '@/components/snote';
import { Note } from '@/components/note';

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

    edit_snote: (state: any, snote:any) => { // TODO: figure out if anything needs to be here (works fine with nothing??)
      // log.info('mutation edit_snote: '+snote.get_note.content);
      // const index = state.snotes.findIndex(note => note.idx === snote.note_idx );
      // log.info('***** old content: '+state.snotes[index].content);
      // Vue.set(state.snotes[index],'content',snote.get_note.content);
      // log.info('***** new content: '+state.snotes[index].content+' by '+state.snotes[index].author);
    },

    // TODO: do I need create_snote here to add new to snotes?
    create_snote: (state: any, snote:any) => {
      state.snotes.push(snote);
    }

  },
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/feedback/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },

    // SK - for AP - requires the existence of hello_post route on the API side
    hello_post: async (context: any, args: any) => {
      try {
        const rval = await fetch('http://localhost:5101/feedback/v1.0/hello_post',
        {
          method: 'POST',
          body: JSON.stringify({hello:'world'})
        });
        log.info(rval);
      } catch(err) {
        log.error(err);
      }
    },

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
        log.info ( 'rvals type: ' + typeof(rval) );
        //const state = await rval.json();
        // log.info(`Got ${state.message} from the server`);
        context.commit('delete_snote', rval.body); // context.commit('delete_snote', state.message);
      } catch ( e ) {
        log.error(e.message);
      }
    },

    edit_snote: async (context: any, snote:any ) => { //idx: string
      try{
        log.info( 'Accessing route to edit content of a sticky' );

        const query_string = '?idx='+snote.note_idx+'&content='+snote.get_note.content;
        const url = 'http://localhost:5101/feedback/v1.0/edit_snote'+query_string; // + idx

        log.info('********** Getting url: ' + url );
        const rval = await fetch(url);
        context.commit('edit_snote', snote);
      } catch ( e ) {
        log.error(e.message);
      }
    },

    create_snote: async ( context: any, snote:Note ) => {
      const json_note = JSON.stringify(snote);
      try {
        const rval = await fetch('http://localhost:5101/feedback/v1.0/create_snote',
        {
          method: 'POST',
          body: json_note
        });
        log.info(rval);
        context.commit('create_snote', snote);
      } catch(err) {
        log.error(err);
      }
    },
  }
};
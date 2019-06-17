import { log }        from '@/logger';
import { Module }     from 'vuex';
import { RootState }  from '@/store/types';
import Vue            from 'vue';
import { Note } from '@/components/note';
import { Student } from '@/components/student';
import { Assignment } from '@/components/assignment';
import { Annotation } from '@/components/annotation';

// FeedbackState Interface
export interface FeedbackState {
  hello: string;
  // SK - filling in the missing interface definition
  // SK - when snote data assumes its final form suggest you define an interface
  // instead of using any[] here (e.g. Array<SNoteData>)
  snotes: Note[];
  annotations: any[];
  students: Student[];
  assignments: Assignment[];
  //clickerMode: string;
}

// FeedbackState Default
const feedback_state: FeedbackState = {
  hello: 'Hello Mines 2019 Field Session',
  // SK - filling in the missing state
  snotes: [],
  annotations: [],
  students: [],
  assignments: [],
  //clickerMode: '',
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
    annotations: (state: any, annots:any) => {
      state.annotations = annots;
    },
    assignments: (state: any, assigns:any) => {
      state.assignments = assigns;
    },
    students: (state: any, studs:any) => {
      state.students = studs;
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
      state.conferences.splice(idx,1); // TODO: fix error "cannot read property splice of undefined"
    },

    // edit_snote: (state: any, snote:any) => { // TODO: figure out if anything needs to be here (works fine with nothing??)
    //   // log.info('mutation edit_snote: '+snote.get_note.content);
    //   // const index = state.snotes.findIndex(note => note.idx === snote.note_idx );
    //   // log.info('***** old content: '+state.snotes[index].content);
    //   // Vue.set(state.snotes[index],'content',snote.get_note.content);
    //   // log.info('***** new content: '+state.snotes[index].content+' by '+state.snotes[index].author);
    // },

    // move_snote: (state: any, snote:any) => {
    //   const idx = state.snotes.findIndex(note => note.id === snote.id );
    //   Vue.set(state.snotes,idx,snote);
    // },

    create_snote: (state: any, snote:Note) => {

      state.snotes.push(snote);
    },

    annotate: (state: any, annot:Annotation) => {
      const idx = state.annotations.findIndex(curr_annot => curr_annot.content_idx === annot.content_idx );
      // ^idx = -1 if not found
      log.info('idx: '+idx);
      if( idx >= 0 && idx < state.annotations.length ){
        Vue.set(state.annotations, idx, annot);
      }else{
        state.annotations.push(annot);
      }
      
    },
  },
  actions: {
    hello: async (context: any, args: any) => {
      const rval = await fetch('http://localhost:5101/feedback/v1.0/hello')
      const state = await rval.json();
      log.info(`Got ${state.message} from the server`);
      context.commit('hello', state.message);
    },

    // route to view all sticky notes (snotes)
    snotes: async (context: any, args: any) => {
      try {
        // references route defined in test_routes.ts::
        const rval = await fetch('http://localhost:5101/feedback/v1.0/snotes')
        const rval_json = await rval.json();
        log.info(`Got (all sticky notes) ${rval_json} from the server`);
        log.info(rval_json.message);
        context.commit('snotes', rval_json.message);
      } catch(e) {
        log.error(e);
      }
    },

    // route to view all annotations (canvas drawings)
    annotations: async (context: any, args: any) => {
      try {
        // references route defined in test_routes.ts::
        const rval = await fetch('http://localhost:5101/feedback/v1.0/annotations')
        const rval_json = await rval.json();
        log.info(`Got (all annotations) ${rval_json} from the server`);
        log.info(rval_json.message);
        context.commit('annotations', rval_json.message);
      } catch(e) {
        log.error(e);
      }
    },

    // route to view all assignments
    assignments: async (context: any, args: any) => {
      try {
        // references route defined in test_routes.ts::
        const rval = await fetch('http://localhost:5101/feedback/v1.0/assignments')
        const rval_json = await rval.json();
        log.info(`Got (all assignments) ${rval_json} from the server`);
        context.commit('assignments', rval_json.message);
      } catch(e) {
        log.error(e);
      }
    },

    students: async (context: any, args: any) => {
      try {
        const rval = await fetch('http://localhost:5101/feedback/v1.0/students')
        const rval_json = await rval.json();
        log.info(`Got (all students) ${rval_json} from the server`);
        context.commit('students', rval_json.message);
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
        // TODO: fix delete snote moves other snote bug
        context.commit('delete_snote', rval.body); // context.commit('delete_snote', state.message);
      } catch ( e ) {
        log.error(e.message);
      }
    },

    edit_snote: async (context: any, snote:any ) => { //idx: string
      try{
        log.info( 'Accessing route to edit content of a sticky' );

        const query_string = '?idx='+snote.note_idx+'&content='+snote.note_content+'&timestamp='+Date.now();
        const url = 'http://localhost:5101/feedback/v1.0/edit_snote'+query_string;
        log.info('********** Getting url: ' + url );
        const rval = await fetch(url);
        //context.commit('edit_snote', snote);
      } catch ( e ) {
        log.error(e.message);
      }
    },

    move_snote: async (context: any, args:any ) => { // snote:any, new_x:number, new_y:number TODO: if don't need commit then just pass idx not whole object
      try{
        log.info( 'Accessing route to move sticky location' );
        //const query_string = '?idx='+snote.note_idx+'&x='+new_x+'&y='+new_y;
        const query_string = `?idx=${args.idx}&x=${args.pt.x}&y=${args.pt.y}`;
        const url = `http://localhost:5101/feedback/v1.0/move_snote${query_string}`;
        log.info('********** Getting url: ' + url );
        const rval = await fetch(url);
        // TODO: make move update store
        // context.commit('move_snote', args[0]);
      }catch ( e ) {
        log.error(e.message);
      }
    },

    create_snote: async ( context: any, snote:Note ) => {
      try {
        const json_note = JSON.stringify(snote);
        log.info(json_note);
        const rval = await fetch('http://localhost:5101/feedback/v1.0/create_snote',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: json_note
        });
        log.info(rval);
        context.commit('create_snote', snote);
      } catch(err) {
        log.error(err);
      }
    },

    annotate: async ( context: any, annotation:Annotation ) => {
      try {
        const json_annotation = JSON.stringify(annotation);
        // log.info(json_annotation);
        const rval = await fetch('http://localhost:5101/feedback/v1.0/annotate',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: json_annotation
        });
        log.info(rval);
        context.commit( 'annotate', annotation );
      } catch(err) {
        log.error(err);
      }
    },

  }
};
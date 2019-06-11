import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import Snote from './Snote.vue';
import { Note } from './note';
import {Guid} from 'guid-typescript';
import { AssignmentObj } from './assignmentobj';

@Component({
  components: {
    MainContent,
    Snote,
  }
})
export default class TeacherAssignment extends Vue {

    constructor() {
      super();
    }

    // snotes 5/29
    public get snotes(){
        return this.$store.state.feedback.snotes.filter( (curr_snote) => {
          return curr_snote.content_idx === this.$route.params.idx;
        }, this);
        // filter only gets the sticky notes that are on the content
    }

    public get get_image_path(){
      const assign:AssignmentObj = this.get_assignment;
      return assign.url;
    }

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.$route.params.idx;
        }, this);
        return rval;
    }

    public create_snote(){
      const new_idx = Guid.raw();
      const new_note:Note = {
        idx: new_idx,
        author: 'TODO',
        content: 'Write Your Feedback Here',
        type: 'snote',
        timestamp: Date.now(),
        x: 10,
        y: 10,
        deleted: false,
        content_idx: this.$route.params.idx
      };
      this.$store.dispatch( 'feedback/create_snote', new_note );
    }

}

import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import DrawingBoard from './DrawingBoard.vue'
import Snote from './Snote.vue';
import { Note } from './note';
import {Guid} from 'guid-typescript';
import { Assignment } from './assignment';
import { Student } from './student';


@Component({
  components: {
    MainContent,
    Snote,
    DrawingBoard,
  }
})



export default class TeacherAssignment extends Vue {
  // This is to record the State of the mouse wheter it's in stickynote or annotation
    private clickerMode = '';  

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
      const assign:Assignment = this.get_assignment;
      return assign.url;
    }

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.$route.params.idx;
        }, this);
        return rval;
    }

    public get get_student() {
      const assign = this.get_assignment;
      const rval:Student = this.$store.state.feedback.students.find( (stud) => {
          return stud.idx === assign.student_idx;
      }, this);
      // TODO: figure out why can't do .name here but can do in vue file
      // const stud_name = rval.name;
      // return stud_name;
      return rval;
  }

    public get get_message() {
      // return this.$store.state.feedback.clickerMode;
      return this.clickerMode;
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
    public create_annotation(){
      this.$store.dispatch('feedback/clickerMode', 'annotate');
      this.clickerMode = 'annotate';
    }
    public pointer(){
      this.$store.dispatch('feedback/clickerMode', 'pointer');
      this.clickerMode = 'pointer';
    }
    public erase(){
      this.$store.dispatch('feedback/clickerMode', 'erase');  
      this.clickerMode = 'erase';
    }
    
}

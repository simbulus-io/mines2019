import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import DrawingBoard from './DrawingBoard.vue'
import Snote from './Snote.vue';
import { Note } from './note';
import {Guid} from 'guid-typescript';
import { Assignment } from './assignment';
import { Student } from './student';
import { Annotation } from './annotation';
import { stringify } from 'query-string';


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


    public get image_path(){
      const assign:Assignment = this.assignment;
      return assign ? assign.url : '';
    }

    public get assignment_title(){
      const assignment = this.assignment;
      return assignment ? assignment.title : ''; 
    }

    public get assignment() {
        // Passing the this context as the second arg to JS find
        const rval = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.$route.params.idx;
        }, this);
        return rval;
    }

    public get student_name() {
      const student:Student = this.$store.state.feedback.students.find( (stud) => {
          return stud.idx === this.assignment.student_idx;
      }, this);
      return student ? student.name : '';
    }

    public get get_message() {
      return this.$store.state.feedback.clickerMode;
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
    }
    public pointer(){
      this.$store.dispatch('feedback/clickerMode', 'pointer');
    }
    public erase(){
      this.$store.dispatch('feedback/clickerMode', 'erase');
    }
    public clear_all_annotations(){
      this.$store.dispatch('feedback/clickerMode', 'clear');
    }
    public save_annotations(){

      // const new_idx = Guid.raw();
      const c = document.getElementById('canvas') as HTMLCanvasElement;
      // const ctx = c.getContext('2d') as CanvasRenderingContext2D;
      // SERIALIZATION
      const serializedCanvas = c.toDataURL();
      const new_png: Annotation = {
        // author: '',
        content: serializedCanvas,
        timestamp: Date.now(),
        // idx: new_idx,
        // deleted: false,
        content_idx: this.$route.params.idx,
      };
      this.$store.dispatch('feedback/annotate', new_png);

    }

}

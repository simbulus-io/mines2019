import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import StudentSnote                 from './StudentSnote.vue';
import { Note }                     from './note';
import {Guid}                       from 'guid-typescript';
import { AssignmentObj }            from './assignmentobj';
import  DrawingBoard                from './DrawingBoard.vue';

@Component ({
    components:{
        MainContent,
        StudentSnote,
        DrawingBoard
    }
})
export default class StudentAssignment extends Vue{
    // TODO: have this class and teacher class extend a class with common functionality

    constructor() {
      super();
    }

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
}
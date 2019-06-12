import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import SnoteStudent                 from './SnoteStudent.vue';
import { Assignment }            from './assignment';
import  DrawingBoard                from './DrawingBoard.vue';

@Component ({
    components:{
        MainContent,
        SnoteStudent,
        DrawingBoard
    }
})
export default class StudentAssignment extends Vue{

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
      const assign:Assignment = this.get_assignment;
      return assign.url;
    }

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval:Assignment = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.$route.params.idx;
        }, this);
        return rval;
    }
}
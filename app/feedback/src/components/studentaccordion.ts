import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { AssignmentObj } from './assignmentobj';
import SnoteSlug from './SnoteSlug.vue';

@Component({
    components: {
        SnoteSlug,
    }
})
export default class StudentAccordion extends Vue {

    @Prop() private readonly assign_idx!: string;
    private active = false; // if slug row is expanded or not

    public get getActive(){
        return this.active;
    }

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval:AssignmentObj = this.$store.state.feedback.assignments.find( (assign) => {
          return assign.idx === this.assign_idx;
        }, this);
        return rval;
      }

      public get snotes(){
        return this.$store.state.feedback.snotes.filter( (curr_snote) => {
          return curr_snote.content_idx === this.assign_idx;
        }, this);
        // filter only gets the sticky notes that are on the content
    }

    public get get_img_path() {
        const assign:AssignmentObj = this.get_assignment;
        return this.get_assignment.url;
    }

}
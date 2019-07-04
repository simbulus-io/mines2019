import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Assignment } from './assignment';
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

  public get assignment() {
    // Passing the this context as the second arg to JS find
    const rval:Assignment = this.$store.state.feedback.assignments.find( (assign) => {
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

  public get no_snotes(){ // TODO: merge this condition with snotes?; more broadly, where to put this instead of having it everywhere?
    const curr_snotes:any[] = this.$store.state.feedback.snotes.filter( (curr_snote) => {
      return curr_snote.content_idx === this.assign_idx && !curr_snote.deleted;
    }, this);
    if( curr_snotes.length === 0 ){
      return true;
    }else{
      return false;
    }
  }

  public get assignment_url() {
    const assign:Assignment = this.assignment;
    return assign ? assign.url : '';
  }

  public get assignment_title() {
    const assign:Assignment = this.assignment;
    return assign ? assign.title : '';
  }

}
import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Assignment }        from './assignment';
import AssignmentThumb          from '@/components/AssignmentThumb.vue';

@Component({
    components: {
        AssignmentThumb
    }
})
export default class StudentAccordion extends Vue {

    @Prop() private readonly assign_title!: string;
    @Prop() private readonly assign_idx!: string;
    private active = false; // if slug row is expanded or not

    public get assignments(){
        return this.$store.state.feedback.assignments.filter( (assign) => {
          return assign.assignment_idx === this.assign_idx;
        }, this);
        // filter only gets the sticky notes that are on the content
    }

    public get getActive(){
        return this.active;
    }

}
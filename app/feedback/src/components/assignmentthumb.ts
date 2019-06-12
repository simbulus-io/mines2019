import { Component, Prop, Vue } from 'vue-property-decorator';
import { Assignment } from './assignment';
import { Student } from './student';

@Component
export default class AssignmentThumb extends Vue {
    @Prop() private readonly assign_idx!: string;

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval:Assignment = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.assign_idx;
        }, this);
        return rval;
    }

    public get get_student() {
        const assign:Assignment = this.get_assignment;
        const rval:Student = this.$store.state.feedback.students.find( (stud) => {
            return stud.idx === assign.student_idx;
        }, this);
        // TODO: figure out why can't do .name here but can do in vue file
        // getting "Cannot read property of 'name' undefined"
        // const stud_name = rval.name;
        // return stud_name;
        return rval;
    }

    public get get_img_path() {
        const assign:Assignment = this.get_assignment;
        return this.get_assignment.url;
    }

}
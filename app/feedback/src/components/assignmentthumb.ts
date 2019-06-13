import { Component, Prop, Vue } from 'vue-property-decorator';
import { Assignment } from './assignment';
import { Student } from './student';

@Component
export default class AssignmentThumb extends Vue {
    @Prop() private readonly assign_idx!: string;

    public get assignment() {
        // Passing the this context as the second arg to JS find
        const rval:Assignment = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.assign_idx;
        }, this);
        return rval;
    }

    public get assignment_url() {
      return this.assignment ? this.assignment.url : '';
    }

    public get student_name() {
      const student = this.student;
      return student ? student.name : '';
    }

    public get student() {
        const assign:Assignment = this.assignment;
        const rval:Student = this.$store.state.feedback.students.find( (stud) => {
            return stud.idx === assign.student_idx;
        }, this);
        return rval;
    }

}
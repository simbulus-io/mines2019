import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AssignmentThumb extends Vue {
    @Prop() private readonly assign_idx!: string;

    public get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.assign_idx;
        }, this);
        return rval;
    }

    public go_to_assignment() {
        alert('This does not quite work yet...');
    }

}
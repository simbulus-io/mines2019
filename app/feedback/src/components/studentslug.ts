import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import StudentAccordion                from '@/components/StudentAccordion.vue';
import { Student } from './student';

@Component({
    components: {
      MainContent,
      StudentAccordion
    }
  })
export default class StudentSlug extends Vue{
    public get assignments(){
        return this.$store.state.feedback.assignments.filter( (assign) => {
          return assign.student_idx === this.$route.params.idx;
        }, this);
        // filter only gets the sticky notes that are on the content
    }

    public get student(){ // TODO: get this working
      const student:Student = this.$store.state.feedback.students.filter( (stud) => {
        return stud.idx === this.$route.params.idx;
      }, this);
      return student.name;
    }
}
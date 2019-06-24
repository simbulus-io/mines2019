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
    }

    public get student(){
      const student_arr:Student[] = this.$store.state.feedback.students.filter( (stud) => {
        return stud.idx === this.$route.params.idx;
      }, this);
      const student:Student = student_arr[0];
      return student;
    }

    public get name(){
      const stud = this.student;
      return stud ? stud.name : '';
    }
}
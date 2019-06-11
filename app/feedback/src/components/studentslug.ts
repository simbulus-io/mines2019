import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import StudentAccordion                from '@/components/StudentAccordion.vue';

@Component({
    components: {
      MainContent,
      StudentAccordion
    }
  })
export default class StudentSlug extends Vue{
    public get assignments(){
        return this.$store.state.feedback.assignments;
    }
}
import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import accordion                from '@/components/accordion.vue';

@Component({
    components: {
      MainContent,
      accordion
    }
  })
export default class StudentSlug extends Vue{
    public get assignments(){
        return this.$store.state.feedback.assignments;
    }
}
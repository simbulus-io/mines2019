import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

@Component({
  components: {
    MainContent,
  }
})

export default class Dashboard extends Vue {

  // Computed
  public get hello_mines() {
    return this.$store.state.feedback.test_data;
  }

  public get view_names(){
    return this.$store.state.feedback.view_names;
  }
  
  constructor() {
    super();
  }
  
}

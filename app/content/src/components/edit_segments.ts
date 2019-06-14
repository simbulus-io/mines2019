import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';



@Component({
  components: {
    MainContent,
  }
})

export default class EditSegments extends Vue {
  constructor() {
    super();
  }

  // Computed
  public get hello_mines() {
    // First content identifies the store module
    // Second identifies the state member
    return this.$store.state.content.hello;
  }

  // Computed
  public get test_array() {
    return this.$store.state.content.test_array;
  }

}

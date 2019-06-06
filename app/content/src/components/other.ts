import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import LineSeparator            from '@/components/LineSeparator.vue';



@Component({
  components: {
    MainContent,
    LineSeparator,
  }
})

export default class Other extends Vue {
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

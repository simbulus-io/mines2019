import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';



@Component({
  components: {
    MainContent,
  }
})

export default class Other extends Vue {
  constructor() {
    super();
  }

  // Computed
  public get hello_mines() {
    return this.$store.state.feedback.hello;
  }

  // Written by alex to be referenced by the Other.vue file,
  //    references feedback.ts
  public get alex(){
    return this.$store.state.feedback.al;
    //return "Alex cries";
  }
}

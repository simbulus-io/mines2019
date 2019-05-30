import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import Snote from './Snote.vue';
import { Note } from './note';

@Component({
  components: {
    MainContent,
    Snote,
  }
})

export default class Slug extends Vue {
  constructor() {
    super();
  }

  // Written by alex to be referenced by the Other.vue file,
  //    references feedback.ts
  public get alex(){
    return this.$store.state.feedback.al;
    //return "Alex cries";
  }

  // snotes 5/29
  public get snotes(){
    return this.$store.state.feedback.snotes;
  }

}

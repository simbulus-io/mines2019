import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import SnoteSlug from './SnoteSlug.vue';
import { Note } from './note';

@Component({
  components: {
    MainContent,
    SnoteSlug,
  }
})

export default class Slug extends Vue {
  constructor() {
    super();
  }

  // get collection of sticky notes from api from db
  public get snotes(){
    return this.$store.state.feedback.snotes;
  }

}

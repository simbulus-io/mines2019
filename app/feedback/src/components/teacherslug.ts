import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import AssignmentThumb          from '@/components/AssignmentThumb.vue';

import Slug from './slug';

@Component({
  components: {
    MainContent,
    AssignmentThumb
  }
})
export default class TeacherSlug extends Slug {
  public get assignments(){
    //log.info(this.$store.state.feedback.assignments);
    return this.$store.state.feedback.assignments;
  }
}

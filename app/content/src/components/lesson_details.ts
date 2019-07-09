import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import jsonView                 from './JSONView.vue';
import LeafView                 from './LeafView.vue';
import Ingest                 from './Ingest.vue';
import { Lesson } from './lesson';

@Component({
  components: {
    MainContent,
    jsonView,
    LeafView,
    Ingest,
  }
})
export default class LessonDetails extends Vue {
  constructor() {
    super();
  }

  public get content_selection(){
    return this.$store.state.content.content_selection;
  }

  public get lesson() {
    if( this.content_selection !== ''  ){
      const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
        return lesson.idx === this.content_selection;
      }, this);
      return rval;
    } else {
      return null;
    }
}

  public get lesson_name() {
    const lesson: Lesson|null = this.lesson;
    return lesson ? lesson.name : 'UNKNOWN';
  }

  public get lesson_path() {
    const lesson: Lesson|null = this.lesson;
    return lesson ? lesson.path : 'UNKNOWN';
  }

}


import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import jsonView                 from './JSONView.vue';
import LeafView                 from './LeafView.vue';
import { Lesson } from './lesson';

@Component({
  components: {
    MainContent,
    jsonView,
    LeafView
  }
})
export default class Dashboard extends Vue {
  constructor() {
    super();
    this.currSelection = '';
  }

  public currSelection!: string;


  public get content_lessons() {
    return this.$store.state.content.content_lessons;
  }

  public get create_tree() {
    const lessons = this.content_lessons.sort( (a: Lesson,b: Lesson) => {
      if( a.path < b.path ){
        return -1;
      } else if( a.path > b.path ){
        return 1;
      } else { // same path -> check lesson
        if( a.name < b.name ){
          return -1;
        }else if( a.name > b.name ){
          return 1;
        } else {
          return 0;
        }
      }
    });
    let data = { } as any;
    lessons.forEach((lesson: Lesson) => {
      const path_arr: string[] = lesson.path.split('/');
      let node = data;
      path_arr.forEach(field => {
        if ( !(field in node) ) {
          node[field] = { } as any;
          
        }
        node = node[field];
      });
      node[lesson.name] = lesson.url;
    });
    return data;
  }

  public itemSelected(e: any){ 
    this.currSelection = this.find_lesson_idx(e);
  }

  public find_lesson_idx(e) {
    if( 'path' in e && 'key' in e ){
      const path_arr: string[] = e.path.split('/');
      path_arr.shift();
      path_arr.pop();
      const path = path_arr.join('/');
      const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
        return lesson.path === path && lesson.name === e.key;
      }, this);
      return rval ? rval.idx : '';
    } else {
      return '';
    }
  }

}


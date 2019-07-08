
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Lesson }               from './lesson';
import jsonView                 from './JSONView.vue';

@Component({
  components: {
    jsonView,
  }
})
export default class LeftNav extends Vue {

  constructor() {
    super();
  }

  public created() {
    log.info(this.$route);
  }

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
    const new_val = this.find_lesson_idx(e);
    this.$store.dispatch( 'content/content_selection', new_val);
  }

  public find_lesson_idx(e) {
    if( 'path' in e && 'key' in e ){
      const path_arr: string[] = e.path.split('/');
      path_arr.shift(); // remove 'root' from path
      path_arr.pop(); // remove lesson # (or equivalent) from path
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


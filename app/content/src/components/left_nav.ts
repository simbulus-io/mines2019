
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

  public filter_selection: string = 'unprocessed';

  constructor() {
    super();
  }

  public created() {
    log.info(this.$route);
  }

  public filter_options = [
    'unprocessed',
    'processed - accepted',
    'processed - rejected',
    'no keywords',
    'no notes',
    'no standards',
  ];

  public get content_lessons() {
    return this.$store.state.content.content_lessons;
  }

  public get num_filter_lessons() {
    const lessons:Lesson[] = this.content_lessons;
    let num_lessons = 0;
    lessons.forEach((lesson: Lesson) => {
      if( this.filter_category === 'status' ){
        if(lesson.status===this.filter_selection){
          num_lessons++;
        }
      } else {
        if(lesson[this.filter_category].length===0){
          num_lessons++;
        }
      }
      
    });
    return num_lessons;
  }

  public get filter_category() {
    switch(this.filter_selection){
      case 'unprocessed':
      case 'processed - accepted':
      case 'processed - rejected':
        return 'status';
        break;
      case 'no keywords':
        return 'keywords';
        break;
      case 'no notes':
        return 'notes';
        break;
      case 'no standards':
        return 'standards';
        break;
      default:
        return '';
    }
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
      if (this.filter_category === 'status') {
        node[lesson.name] = lesson[this.filter_category];
      } else {
        if(lesson[this.filter_category].length === 0){
          node[lesson.name] = `no ${this.filter_category}`;
        } else if (lesson[this.filter_category].length === 1) {
          const cat = this.filter_category.substring(0, this.filter_category.length - 1);
          node[lesson.name] = `${lesson[this.filter_category].length} ${cat}`;
        } else {
          node[lesson.name] = `${lesson[this.filter_category].length} ${this.filter_category}`;
        }
      }
      
    });
    return data;
  }

  public select_nothing() {
    this.$store.dispatch( 'content/content_selection', '');
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


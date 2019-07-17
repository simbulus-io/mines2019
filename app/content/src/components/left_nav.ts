
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Lesson }               from './lesson';
import jsonView                 from './JSONView.vue';
import { STATUS_VALUES }                from './status_values';

@Component({
  components: {
    jsonView,
  }
})
export default class LeftNav extends Vue {

  public highlight_selection: string = 'unprocessed';

  constructor() {
    super();
  }

  public created() {
    log.info(this.$route);
  }

  public readonly highlight_options = STATUS_VALUES.concat([
    'no keywords',
    'no notes',
    'no standards',
  ]);

  public get content_lessons() {
    return this.$store.state.content.content_lessons;
  }

  public get num_highlight_lessons() {
    const lessons:Lesson[] = this.content_lessons;
    let num_lessons = 0;
    lessons.forEach((lesson: Lesson) => {
      if( this.highlight_category === 'status' ){
        if(lesson.status===this.highlight_selection){
          num_lessons++;
        }
      } else {
        if(lesson[this.highlight_category].length===0){
          num_lessons++;
        }
      }
      
    });
    return num_lessons;
  }

  public get highlight_category() {
    if( STATUS_VALUES.includes(this.highlight_selection) ) {
      return 'status';
    } else {
      return this.highlight_selection.substring(3); // remove 'no ' to get category
    }
  }

  public get create_tree() {
    const lessons = this.content_lessons.sort( (a: Lesson,b: Lesson) => {
      // compare by path alphabetically but deal with special cases
      // Kindergarten -> front, HS content -> end
      if ( a.path.includes('Kindergarten') && !b.path.includes('Kindergarten') ) {
        return -1;
      } else if ( !a.path.includes('Kindergarten') && b.path.includes('Kindergarten') ) {
        return 1;
      } else if ( !a.path.includes('Grade') && b.path.includes('Grade') ) {
        // a is some HS content and b is Grade # content
        return 1;
      } else if ( a.path.includes('Grade') && !b.path.includes('Grade') ) {
        // b is some HS content and a is Grade # content
        return -1;
      }
      // end special cases -> generally compare by path alphabetically
      // TODO: sort Grades and Modules correctly with double digit #s (currently 10 < 8, etc.)
      else if( a.path < b.path ){
        return -1;
      } else if( a.path > b.path ){
        return 1;
      } else { // same path -> check lesson #
        if( a.lesson_num < b.lesson_num ){
          return -1;
        }else if( a.lesson_num > b.lesson_num ){
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
      if (this.highlight_category === 'status') {
        node[lesson.name] = lesson[this.highlight_category];
      } else {
        if(lesson[this.highlight_category].length === 0){
          node[lesson.name] = `no ${this.highlight_category}`;
        } else if (lesson[this.highlight_category].length === 1) {
          const cat = this.highlight_category.substring(0, this.highlight_category.length - 1);
          node[lesson.name] = `${lesson[this.highlight_category].length} ${cat}`;
        } else {
          node[lesson.name] = `${lesson[this.highlight_category].length} ${this.highlight_category}`;
        }
      }
      
    });
    return data;
  }

  public select_nothing() {
    this.$store.dispatch( 'content/content_selection', '');
    this.$router.push('/');
  }

  public itemSelected(e: any){ 
    const new_val = this.find_lesson_id(e);
    this.$store.dispatch( 'content/content_selection', new_val);
    this.$router.push('/');
  }

  public find_lesson_id(e) {
    if( 'path' in e && 'key' in e ){
      const path_arr: string[] = e.path.split('/');
      path_arr.shift(); // remove 'root' from path
      path_arr.pop(); // remove lesson # (or equivalent) from path
      const path = path_arr.join('/');
      const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
        return lesson.path === path && lesson.name === e.key;
      }, this);
      return rval ? rval._id : '';
    } else {
      return '';
    }
  }
  
}


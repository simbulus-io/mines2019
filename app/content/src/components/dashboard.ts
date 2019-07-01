import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import jsonView                 from './JSONView.vue';
import LeafView                 from './LeafView.vue';



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
    this.currSelection = null;
  }

  public currSelection!: any;

  // Computed
  public get content_data() {
    log.info('Grabbing content_tree data from store');
    return this.$store.state.content.content_tree;
  }

  public get content_provders() {
    return this.$store.state.content.content_providers;
  }

  public get content_lessons() {
    return this.$store.state.content.content_lessons;
  }

  public get create_tree() {
    
    const provs = this.content_provders;
    const lessons = this.content_lessons.sort( (a,b) => {
      // should go grade > module > lesson in order
      if( a.grade < b.grade ){ 
        return -1;
      } else if( a.grade > b.grade ){
        return 1;
      } else { // same grade -> check module
        if( a.module < b.module ){ 
          return -1;
        } else if( a.module > b.module ){
          return 1;
        } else { // same module -> check lesson
          if( a.number < b.number ){ 
            return -1;
          } else if( a.number > b.number ){
            return 1;
          } else { // should never reach here if no repeats
            return 0;
          }
        }
      }
    });
    log.info(provs);
    log.info(lessons);

    let data = { } as any;
    if( lessons !== undefined ){
      lessons.forEach(lesson => {
        const lesson_to_add = lesson.url;
        const prov_id = lesson.content_provider_id;
        const prov = provs.find( (provider) => {
          return provider._id === prov_id;
        });
        const prov_name = prov.name;
        const lesson_module = `Module ${lesson.module}`;
        const lesson_number = `Lesson ${lesson.number}`;
        const lesson_grade = {
          [lesson_module]: {
            [lesson_number]: lesson_to_add,
          }
        };

        if( prov_name in data ){ // content provider exists
          if ( lesson.grade in data[prov_name] ) { // grade exists for this content provider
            if( lesson_module in data[prov_name][lesson.grade] ){
              // module exists for this grade and content provider
              data[prov_name][lesson.grade][lesson_module][lesson_number] = lesson_to_add
            } else {
              // module does not exist for this grade and content provider
              data[prov_name][lesson.grade][lesson_module] = {
                [lesson_number]: lesson_to_add,
              };
            }
          } else { // grade does not exist for this content provider
            data[prov_name][lesson.grade] = lesson_grade;
          }
        } else { // content provider does not exist
          data[prov_name] = {
            [lesson.grade]: lesson_grade,
          };
        }
        
      });
    }
    return data;
  }

  public itemSelected(e: any){ // when a leaf node is selected
    // e is passed from json-view from json-view-item
    // object with key, value, and path properties
    //alert(`Item Selected. ${e.key} ${e.value} ${e.path}`);
    this.currSelection = e;
  }

}


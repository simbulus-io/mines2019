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
    this.currSelection = '';
  }

  public currSelection!: string;

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
        // TODO: improve grade comparison to be grade order and not just alphabetical
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
    this.currSelection = this.find_db_lesson_id(e);
  }

  public key(e) {
    return e ? e.key : '';
  }

  public value(e) {
    return e ? e.value : '';
  }

  public path(e) {
    return e ? e.path : '';
  }

  public parse_path(e) {
      const parsed: string[] = this.path(e).split('.');
      if( parsed !== undefined && parsed.length >= 5 ){
          const prov = this.$store.state.content.content_providers.find( (provider) => {
              return provider.name === parsed[1];
          });
          const pprovid = prov ? prov._id : -1;
          const pgrade = parsed[2];
          const pmodule_arr = parsed[3].match(/\d+/g)
          const pmodule =  pmodule_arr ? pmodule_arr[0] : -1;
          const pnumber_arr = parsed[4].match(/\d+/g);
          const pnumber = pnumber_arr ? pnumber_arr[0] : -1;
          return {
              content_provider_id : pprovid,
              grade: pgrade,
              module: pmodule,
              number: pnumber,
          };
      }
      return { // TODO: is there a better not found rval?
          content_provider_id : -1,
          grade: -1,
          module: -1,
          number: -1,
      };
  }

  public find_db_lesson_id(e) {
      const parsed = this.parse_path(e);
      if( parsed !== null ) {
          const rval = this.$store.state.content.content_lessons.find( (lesson) => {
              return lesson.content_provider_id === parsed.content_provider_id &&
                      lesson.grade === parsed.grade &&
                      lesson.module === parsed.module &&
                      lesson.number === parsed.number;
          }, this);
          return rval ? rval._id : -1;
      }
  }

}


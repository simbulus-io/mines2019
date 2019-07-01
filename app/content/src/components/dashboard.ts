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
  
  public get content_data() {
    log.info('Grabbing content_tree data from store');
    return this.$store.state.content.content_tree;
    // return {
    //     'EngageNY':{
    //       'Grade':{
    //         'Kindergarten':'No Content',
    //         'First':{
    //           'Module 1':{
    //             'Lesson 1':'Addition',
    //             'Lesson 2':'Subtraction',
    //             'Lesson 3':'Advanced Quadratic Equations',
    //             'Misc':{
    //               'Graphing':
    //                 ['Stuff','Even Cooler Stuff']
    //             },
    //             'Module 2':'No Content'
    //           }
    //         },
    //         'Second':'No Content',
    //       }
    //     },
    //     'Other Content Source': 'TBD'
    //   }
  }

  // public data = {
  //   'EngageNY':{
  //     'Grade':{
  //       'Kindergarten':'No Content',
  //       'First':{
  //         'Module 1':{
  //           'Lesson 1':'Addition',
  //           'Lesson 2':'Subtraction',
  //           'Lesson 3':'Advanced Quadratic Equations',
  //           'Misc':{
  //             'Graphing':
  //               ['Stuff','Even Cooler Stuff']
  //           },
  //           'Module 2':'No Content'
  //         }
  //       },
  //       'Second':'No Content',
  //     }
  //   },
  //   'Other Content Source': 'TBD'
  // }
  

  // Computed
  public get hello_mines() {
    return this.$store.state.content.test_data;
  }

  public itemSelected(e: any){ // when a leaf node is selected
    // e is passed from json-view from json-view-item
    // object with key, value, and path properties
    alert(`Item Selected. ${e.key} ${e.value} ${e.path}`);
    this.currSelection = e;
  }

}

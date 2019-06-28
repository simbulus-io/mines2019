import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import jsonView                 from './JSONView.vue';



@Component({
  components: {
    MainContent,
    jsonView,
  }
})

export default class Dashboard extends Vue {
  constructor() {
    super();
  }

  public data = {
    'glossary':{
      'title':'example glossary',
      'GlossDiv':{
        'title':'S',
        'GlossList':{
          'GlossEntry':{
            'ID':'SGML',
            'SortAs':'SGML',
            'GlossTerm':'Standard Generalized Markup Language',
            'Acronym':'SGML',
            'Abbrev':'ISO 8879:1986',
            'GlossDef':{
              'para':'A meta-markup language, used to create markup languages such as DocBook.',
              'GlossSeeAlso':
                ['GML','XML']
            },
            'GlossSee':'markup'
          }
        }
      }
    }
  }

  // Computed
  public get hello_mines() {
    return this.$store.state.content.test_data;
  }

  public itemSelected(e: any){ // when a leaf node is selected
    // e is passed from json-view from json-view-item
    // object with key, value, and path properties
    alert(`Item Selected. ${e.key} ${e.value} ${e.path}`);
  }

}

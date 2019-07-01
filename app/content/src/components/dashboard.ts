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

  public itemSelected(e: any){ // when a leaf node is selected
    // e is passed from json-view from json-view-item
    // object with key, value, and path properties
    alert(`Item Selected. ${e.key} ${e.value} ${e.path}`);
    this.currSelection = e;
  }

}

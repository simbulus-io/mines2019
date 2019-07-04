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
    //this.currSelection = '';
  }

  //public currSelection!: string;

  public get content_selection(){
    return this.$store.state.content.content_selection;
  }

}


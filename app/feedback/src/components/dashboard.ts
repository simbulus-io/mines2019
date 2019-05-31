import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import BlogPost from './BlogPost.vue';
import { Post } from './post';



@Component({
  components: {
    MainContent,
    BlogPost,
  }
})

export default class Dashboard extends Vue {
   public bgimage = require("./lion-png-lion-png-clipart-png-image-1366.png");
  // Computed
  public get hello_mines() {
    return this.$store.state.feedback.test_data;
  }

  public get view_names(){
    return this.$store.state.feedback.view_names;
  }
  public onClick() {
    log.info("HI");
    this.items.push("Hey");
  }
  public items=['foo', 'blah']
  constructor() {
    super();
  }
  
}

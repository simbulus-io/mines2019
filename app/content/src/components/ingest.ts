import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import LineSeparator            from '@/components/LineSeparator.vue';


@Component({
  components: {
    MainContent,
  }
})
export default class Ingest extends Vue {

  public url:string = '';

  constructor() {
    super();
  }

  public handle_submit_clicked() {
    log.info(`The URL submitted was ${this.url}`);
    this.$store.dispatch('content/ingest_url', {url:this.url});
  }

  // Computed
  public get hello_mines() {
    // First content identifies the store module
    // Second identifies the state member
    log.info('hello mines');
    return this.$store.state.content.hello;
  }

  // Computed
  public get test_array() {
    return this.$store.state.content.test_array;
  }

}

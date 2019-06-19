import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log , puts }           from '@/logger';
import LineSeparator            from '@/components/LineSeparator.vue';


@Component({
  components: {
    MainContent,
  }
})
export default class Ingest extends Vue {

  public url:string = 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3';

  constructor() {
    super();
  }

  public handle_submit() {
    puts(`The URL submitted was ${this.url}`);
    const result = this.$store.dispatch('content/ingest_url', {url:this.url});
    puts(result);
  }

  // Computed
  public get hello_mines() {
    // First content identifies the store module
    // Second identifies the state member
    puts('hello mines');
    return this.$store.state.content.hello;
  }

  // Computed
  public get test_array() {
    return this.$store.state.content.test_array;
  }

}

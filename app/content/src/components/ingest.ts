import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log , puts }           from '@/logger';
import LineSeparator            from '@/components/LineSeparator.vue';
import { rpc_job_succeeded, rpc_job_error_string } from '@/rpc';


@Component({
  components: {
    MainContent,
  }
})
export default class Ingest extends Vue {

  public server='http://localhost/';

  public hash:(string|null) = null;
  public reported_errors:Array<string> = [];
  public page_thumbnails:Array<string> = [];
  public page_list:string = '-';
  public url:string = 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3';
  
  constructor() {
    super();
  }

  public reset() {
    this.reported_errors = [];
    this.page_thumbnails = [];
  }
  public async handle_submit() {
    this.reset();
    const finished_job = await this.$store.dispatch('content/ingest_url', {url:this.url});
    // puts(finished_job);
    if (!rpc_job_succeeded(finished_job)) {
      let error_message = rpc_job_error_string(finished_job) || 'Unknown error occured while processing job.';
      this.reported_errors.push(error_message);
    }
    else {
      for (let f of finished_job.result.images)
        this.page_thumbnails.push(this.server + finished_job.result.path + '/' + f);
      this.page_list = `1-${finished_job.result.pages.length}`;
      this.hash = finished_job.result.hash;
    }
  }

  public async handle_segment() {
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

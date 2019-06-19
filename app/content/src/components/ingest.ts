// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';
import MainContent                                 from '@/components/MainContent.vue';
import { log , puts }                              from '@/logger';
import LineSeparator                               from '@/components/LineSeparator.vue';
import { rpc_job_succeeded, rpc_job_error_string } from '@/rpc';
// RBM - import the component
import Loading                                     from 'vue-loading-overlay';
// RBM - import stylesheet for component
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
  components: {
    MainContent,
    // RBM - this is the goo that makes the comp available to the template
    Loading,
  }
})
export default class Ingest extends Vue {

  public server='http://localhost/';

  public hash:(string|null) = null;
  public reported_errors:Array<string> = [];
  public page_thumbnails:Array<string> = [];
  public page_list:string = '-';
  public url:string = 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3';

  // RBM - bind loader prop to reactive data
  public show_spinner = false;

  constructor() {
    super();
  }

  public reset() {
    this.reported_errors = [];
    this.page_thumbnails = [];
  }
  public async handle_submit() {
    try {
      this.reset();
      this.show_spinner = true;
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
      this.show_spinner = false;
    } catch(e) {
      log.error(`Unexpected exception in handle submit ${e}`);
      this.show_spinner = false;
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

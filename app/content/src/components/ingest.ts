// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';
import MainContent                                 from '@/components/MainContent.vue';
import { log , puts }                              from '@/logger';
import LineSeparator                               from '@/components/LineSeparator.vue';
import { rpc_job_succeeded, rpc_job_error_string } from '@/rpc';
import hash                                        from 'object-hash';
import Loading                                     from 'vue-loading-overlay';

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

  public content_image:(string|null) = null;
  public hash:(string|null) = null;
  public page_list:string = '-';
  public page_thumbnails:Array<string> = [];
  public reported_errors:Array<string> = [];
  public segmentation:(any|null) = null;
  public url:string = 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3';

  // RBM - bind loader prop to reactive data
  public show_spinner = false;

  constructor() {
    super();
  }

  public reset() {
    this.content_image = null
    this.hash = null;
    this.page_list = '-';
    this.page_thumbnails = [];
    this.reported_errors = [];
    this.segmentation = null;
  }

  public async handle_submit() {
    try {
      this.show_spinner = true;
      this.reset();
      const finished_job = await this.$store.dispatch('content/ingest_url', {url:this.url});
      if (!rpc_job_succeeded(finished_job)) {
        let error_message = rpc_job_error_string(finished_job) || 'Unknown error occured while processing job.';
        puts(error_message);
        puts(finished_job);
        this.reported_errors.push(error_message);
      } else {
        for (let f of finished_job.result.images)
          this.page_thumbnails.push(this.server + finished_job.result.path + '/' + f);
        this.page_list = `1-${finished_job.result.pages.length}`;
        this.hash = finished_job.result.hash;
      }
    } catch(e) {
      log.error(`Unexpected exception in handle_submit ${e}`);
    }
    this.show_spinner = false;
  }

  public async handle_segment() {
    try {
      this.show_spinner = true;
      const finished_job = await this.$store.dispatch('content/process_pdf',
                                                      {hash:this.hash, src:`${this.hash}.pdf`, page_list: this.page_list} );
      if (!rpc_job_succeeded(finished_job)) {
        let error_message = rpc_job_error_string(finished_job) || 'Unknown error occured while processing job.';
        puts(error_message);
        puts(finished_job);
        this.reported_errors.push(error_message);
      } else {
        if (!('summary' in finished_job)) {
          puts('finished_job has no summary field !?');
          puts(finished_job);
          throw Error('finished_job has no summary field');
        }
        puts(finished_job.summary);
        this.content_image = this.server + finished_job.summary.image;
        this.segmentation = {
          dpi: finished_job.summary.dpi,
          shape: finished_job.summary.image_shape,
          white_rows: finished_job.summary.white_space_rows
        };
      }
    } catch(e) {
      log.error(`Unexpected exception in handle_segment: ${e}`);
    }
    this.show_spinner = false;
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

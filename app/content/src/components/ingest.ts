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
import SegmentUI                                   from '@/components/SegmentUI.vue';

@Component({
  components: {
    MainContent,
    // RBM - this is the goo that makes the comp available to the template
    Loading,
    SegmentUI
  }
})
export default class Ingest extends Vue {

  public server='http://localhost/';

  public content_image:(string|null) = null;
  public hash:(string|null) = null;
  public page_list:string = '-';
  public page_thumbnails:Array<string> = [];
  public reported_errors:Array<string> = [];
  public segmentation_job:(any|null) = null; /* cheap cache {
    "job_id": "307ed8c7-63ff-ab48-987f-8062dd316088",
    "args": {
      "src": "23d0d29406f.pdf",
      "tgt": "23d0d29406f-432d.png",
      "crop_rect": [
        0.03,
        0.1,
        0.93,
        0.9
      ],
      "dpi": 432,
      "pages": "1-4",
      "concatenate": true
    },
    "command": "pdf_to_image",
    "dir": "23d0d29406f",
    "log": "",
    "result": {
      "image_shape": [
        15204,
        3304,
        4
      ],
      "fname": "23d0d29406f-432d.png",
      "path": "/shared/jobs/23d0d29406f/23d0d29406f-432d.png",
      "status": 0
    },
    "status": "finished",
    "start_time": "2019-06-21T16:31:48.922Z",
    "worker": "0bba057d5bb9",
    "elapsed_time": 8.810403108596802,
    "finish_time": "2019-06-21T16:31:57.733Z",
    "summary": {
      "image": "/shared/jobs/23d0d29406f/23d0d29406f-108d.png",
      "hi_res": "/shared/jobs/23d0d29406f/23d0d29406f-432d.png",
      "white_space_rows": [
        [0,46], [78,94], [128,180], [200,207], [230,236], [258,402], [442,612],
        [639,648], [670, 676], [700, 977], [1000,1005], [1104,1140], [1166,1176],
        [1198, 1203], [1226, 1576]
      ],
      "dpi": 108,
      "image_shape": [
        3800,
        826,
        4
      ]
    }
  }; */

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
    this.segmentation_job = null;
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
        this.segmentation_job = finished_job;
        /*
        this.segmentation = {
          dpi: finished_job.summary.dpi,
          shape: finished_job.summary.image_shape,
          white_rows: finished_job.summary.white_space_rows
        };*/
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

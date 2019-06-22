// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';
import MainContent                                 from '@/components/MainContent.vue';
import { log , puts }                              from '@/logger';
import LineSeparator                               from '@/components/LineSeparator.vue';
import { rpc_job_succeeded, rpc_job_error_string } from '@/rpc';
import Loading                                     from 'vue-loading-overlay';
import { BlobCache }                               from '@/blob_cache'
import 'vue-loading-overlay/dist/vue-loading.css';
import SegmentUI                                   from '@/components/SegmentUI.vue';

@Component({
  components: {
    MainContent,
    Loading,
    SegmentUI
  }
})
export default class Ingest extends Vue {

  public server='http://localhost/';

  private cache_seg = {'image':'/shared/jobs/23d0d29406f/23d0d29406f-108d.png','hi_res':'/shared/jobs/23d0d29406f/23d0d29406f-432d.png','white_space_rows':[[0,43],[76,95],[124,175],[196,207],[228,231],[256,399],[440,615],[636,647],[668,675],[696,975],[996,1003],[1028,1031],[1056,1059],[1100,1139],[1164,1175],[1192,1199],[1224,1575],[1596,1603],[1624,1631],[1652,1923],[1964,2175],[2200,2411],[2436,2871],[3000,3039],[3060,3091],[3112,3115],[3140,3163],[3188,3211],[3240,3271],[3292,3799]],'dpi':108,'image_shape':[3800,826,4]};
  
  public content_image:(string|null) = null;
  public hash:(string|null) = null;
  public image_size:([number, number]) = [0,0]
  public page_list:string = '-';
  public page_thumbnails:Array<string> = [];
  public image_dpi:number = 0;
  public reported_errors:Array<string> = [];
  public show_spinner = false;
  public url:string = 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3';
  public white_space_rows:(Array<[number, number]>|null) = null

  constructor() {
    super();
  }

  public reset() {
    this.content_image = null
    this.hash = null;
    this.page_list = '-';
    this.page_thumbnails = [];
    this.reported_errors = [];
    this.show_spinner = false;
    this.white_space_rows = null;
  }

  public async handle_keyup(e) {
    if (e.keyCode === 13) await this.handle_submit();
  }

  public async handle_submit() {
    this.reset();
    this.show_spinner = true;
    try {
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
    this.show_spinner = true;
    try {
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
        
        this.image_dpi = finished_job.summary.dpi;
        const ishape:[number, number, number] = finished_job.summary.image_shape;
        this.image_size = [ishape[0], ishape[1]];
        this.white_space_rows = finished_job.summary.white_space_rows;
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

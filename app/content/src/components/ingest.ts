// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue, Watch }                    from 'vue-property-decorator';
import MainContent                                        from '@/components/MainContent.vue';
import { log , puts }                                     from '@/logger';
import { rpc_job_succeeded, rpc_job_error_string }        from '@/rpc';
import SegmentUI                                          from '@/components/SegmentUI.vue';
import ErrorReporter                                      from '@/components/ErrorReporter.vue'
import { pubsub, PubSubMessage }                          from '@/pubsub';
import { Lesson }                                         from './lesson';
import { HOST_URL }                                       from '@/config'
import Loading                                            from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
  components: {
    MainContent,
    Loading,
    SegmentUI,
    ErrorReporter
  }
})
export default class Ingest extends Vue {

  public server = HOST_URL;

  public local_url: string = '';
  public shift_page_num: number = -1;

  private cache_seg = {'image':'/shared/jobs/23d0d29406f/23d0d29406f-108d.png','hi_res':'/shared/jobs/23d0d29406f/23d0d29406f-432d.png','white_space_rows':[[0,43],[76,95],[124,175],[196,207],[228,231],[256,399],[440,615],[636,647],[668,675],[696,975],[996,1003],[1028,1031],[1056,1059],[1100,1139],[1164,1175],[1192,1199],[1224,1575],[1596,1603],[1624,1631],[1652,1923],[1964,2175],[2200,2411],[2436,2871],[3000,3039],[3060,3091],[3112,3115],[3140,3163],[3188,3211],[3240,3271],[3292,3799]],'dpi':108,'image_shape':[3800,826,4]};

  public content_image:(string|null) = null;
  public hash:(string|null) = null;
  public image_size:([number, number]) = [0,0]
  public page_list:string = '-';
  public page_thumbnails:Array<string> = [];
  public image_dpi:number = 0;
  //public reported_errors:Array<string> = [];
  public show_spinner = false;
  public white_space_rows:(Array<[number, number]>|null) = null

  constructor() {
    super();
  }

  public get url() {
    const curr_selection = this.$store.state.content.content_selection;
    if( curr_selection !== '' ){
      const lesson: Lesson = this.$store.state.content.content_lessons.find( (less) => {
        return less._id === curr_selection;
      }, this);
      return lesson ? lesson.student_pdf : '';
    } else {
      return '';
    }
  }

  @Watch('url', { immediate: true, deep: true })
  public on_url(after: string, before: string) {
    this.local_url = after;
    this.reset();
  }

  public reset() {
    this.content_image = null
    this.hash = null;
    this.page_list = '-';
    this.page_thumbnails = [];
    this.image_dpi = 0;
    //this.reported_errors = [];
    // Init from @Prop
    pubsub.$emit(PubSubMessage.ERROR_REPORTER_RESET);
    this.show_spinner = false;
    this.white_space_rows = null;
  }

  // public mounted() {
  //   log.info(`In mounted changing local_url from ${this.local_url} to ${this.url}`);
  //   this.local_url = this.url;
  // }

  public async handle_keyup(e) {
    if (e.keyCode === 13) await this.handle_submit();
  }

  public async handle_submit() {
    this.reset();
    log.info(`Load url for: ${this.local_url}`);
    const job_args = {url:this.local_url};
    try {

      this.show_spinner = true;
      const finished_job = await this.$store.dispatch('content/ingest_url', {url:this.local_url});

      if (!rpc_job_succeeded(finished_job)) {
        let error_message = rpc_job_error_string(finished_job) || 'Unknown error occured while processing job.';
        puts(error_message);
        puts(finished_job);
        pubsub.$emit(PubSubMessage.RPC_JOB_FAILED, error_message);
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
        pubsub.$emit(PubSubMessage.RPC_JOB_FAILED, error_message);
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

  public get page_list_arr() {
    const re_comma = new RegExp('[0-9]+(,|[^-]*)', 'g');
    // ^ comma may or may not be there (ex. last page in list has no comma)
    const re_hyphen = new RegExp('[0-9]+-[0-9]+', 'g');
    const re_arr_comma = this.page_list.match(re_comma);
    const re_arr_hyphen = this.page_list.match(re_hyphen);
    let re_arr:number[] = [];
    if ( re_arr_comma ) {
      re_arr_comma.forEach(expr => {
        // remove comma if it is there
        const string_num = (expr[expr.length-1]===',' ? expr.substring(0, expr.length - 1) : expr );
        const num:number = parseInt(string_num);
        if( !re_arr.includes(num) ) {
          re_arr.push(num);
        }
      });
    }
    if ( re_arr_hyphen ) {
      re_arr_hyphen.forEach(expr => {
        const num_arr: string[] = expr.split('-');
        const start_num : number = parseInt(num_arr[0]);
        const end_num : number = parseInt(num_arr[1]);
        for( let i = start_num; i <= end_num; i++) {
          if( !re_arr.includes(i) ) {
            re_arr.push(i);
          }
        }
      });
    }
    return re_arr.sort();
  }

  public in_page_list(page_num:number) {
    if ( this.page_list_arr.includes(page_num) ) {
      return true;
    } else {
      return false;
    }
  }

  public toggle_page_selection( page_num: number ) {
    const page_arr = this.page_list_arr;
    if( this.in_page_list( page_num ) ) {
      // is in page list -> remove
      const remove_index = page_arr.indexOf(page_num);
      // TODO: improve by detecting sequential # and replace n, n+1, ..., n+m with hyphen form in n-n+m
      page_arr.splice(remove_index, 1);
    } else {
      page_arr.push(page_num);
      page_arr.sort();
      // TODO: could be better by detecting for  last char being 0-9, comma, or space
    }
    this.page_list = page_arr.join(', ');
  }

  public shift_toggle_page_selection( page_num: number ) {
    if (this.shift_page_num > 0) {
      // this is the second shift click
      const lower_bound = this.shift_page_num <= page_num ? this.shift_page_num : page_num;
      const upper_bound = this.shift_page_num > page_num ? this.shift_page_num : page_num;
      if ( this.in_page_list(lower_bound) ) {
        // first page was selected -> remove range from selected
        const page_arr = this.page_list_arr;
        for(let i = page_arr.length -1 ; i >= 0 ; i--) {
          // remove value if in range
          if( page_arr[i] <= upper_bound && page_arr[i] >= lower_bound) {
            page_arr.splice(i, 1)
          }
        }
        this.page_list = page_arr.join(', ');
      } else {
        // first page was not selected -> make range the selected pages
        this.page_list = `${lower_bound}-${upper_bound}`;
      }
      this.shift_page_num = -1;
    } else {
      // this is the first shift click
      if(page_num > 0 && page_num <= this.page_thumbnails.length) {
        this.shift_page_num = page_num;
      }
    }
  }
}

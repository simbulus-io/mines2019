import { clone }                                          from 'lodash-es';
import { Component, Prop, Vue }                           from 'vue-property-decorator';
import MainContent                                        from '@/components/MainContent.vue';
import { log, puts }                                            from '@/logger';
import { Lesson }                                         from './lesson';
import { rpc_job_succeeded, rpc_job_error_string }        from '@/rpc';
import { pubsub, PubSubMessage }                          from '@/pubsub';



@Component({
  components: {
    MainContent,
  }
})
export default class BatchProcess extends Vue {
  constructor() {
    super();
  }

  public mounted() {
    log.info('BatchProcess mounted called');
    this.batch_process();
  }

  public status: string = 'waiting to start batch processing'
  public limit_num: number = 5;
  public completed: string[] = [];

  public async batch_process() {
    log.info('begin batch');
    // TODO: how to get to wait until lessons grabbed from DB?
    const unproc_lessons = this.$store.state.content.content_lessons.filter( (lesson) => {
          return true; //lesson.status === 'unprocessed';
        }, this).splice(0, this.limit_num);

    this.status = `beginning batch_process with ${unproc_lessons.length} lessons`;
    const finished_jobs: any[] = [];
    
    unproc_lessons.forEach(async (lesson: Lesson) => {
      try {
        this.status = `processing url for ${lesson.path} at ${lesson.student_pdf}`;
        const finished_job = await this.$store.dispatch('content/ingest_url', {url:lesson.student_pdf});
  
        if (!rpc_job_succeeded(finished_job)) {
          this.status = `processing unsuccessful for ${lesson.path} at ${lesson.student_pdf}`;
          let error_message = rpc_job_error_string(finished_job) || 'Unknown error occured while processing job.';
          puts(error_message);
          puts(finished_job);
          pubsub.$emit(PubSubMessage.RPC_JOB_FAILED, error_message);
        } else {
          this.status = `processing successful for ${lesson.path} at ${lesson.student_pdf}`;
          finished_jobs.push(finished_job);
          // TODO: change lesson status here
          this.completed.push(`${lesson.path}/${lesson.name}`);
        }
      } catch(e) {
        this.status = 'processing exception';
        log.error(`Unexpected exception in batch processing: ${e}`);
      }
    });
    // TODO: await all promises here?
    this.status = `processing complete for ${unproc_lessons.length} lessons`;
  }

}


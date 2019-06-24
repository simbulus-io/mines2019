import { Component, Vue }        from 'vue-property-decorator';
import { pubsub, PubSubMessage } from '@/pubsub';
import { log }                   from '@/logger';


@Component({
  components: {
  }
})
export default class ErrorReporter extends Vue {

  public reported_errors:string[] = [];

  constructor() {
    super();
  }

  public reset() {
    this.reported_errors = [];
  }

  public created() {

    pubsub.$on(PubSubMessage.TEST_MESSAGE, (payload) => {
      log.info(PubSubMessage.TEST_MESSAGE, payload);
    });

    pubsub.$on(PubSubMessage.RPC_JOB_FAILED, (error_message: string) => {
      log.error(PubSubMessage.RPC_JOB_FAILED, error_message);
      this.reported_errors.push(error_message);
    });
    // fire a test message
    pubsub.$emit(PubSubMessage.TEST_MESSAGE, 'hello from pubsub');
  }

}

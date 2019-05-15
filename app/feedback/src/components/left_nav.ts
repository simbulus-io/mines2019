
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
@Component
export default class LeftNav extends Vue {

  constructor() {
    super();
  }

  public created() {
    log.info(this.$route);
  }
}


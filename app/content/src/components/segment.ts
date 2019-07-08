import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import LineSeparator            from '@/components/LineSeparator.vue';


@Component({
  components: {
    MainContent,
    LineSeparator,
  }
})

export default class SegmentSelector extends Vue {

  constructor() {
    super();
  }

  // Computed
  public get test_array() {
    return this.$store.state.content.test_array;
  }

}

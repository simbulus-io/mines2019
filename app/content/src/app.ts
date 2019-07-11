import { Component, Vue }   from 'vue-property-decorator';
import Nav                  from '@/components/Nav.vue'; // @ is an alias to /src
import { log }              from './logger';
import { API_BASE_URL }     from '@/config';

@Component({
  name: 'app',
  components: {
    Nav,
  },
})
export default class App extends Vue {

  constructor() {
    super();
  }

  // Lifecycle
  public async created() {
    // Initial action dispatches are done here - its very
    // possible that other actions will be dispatched from
    // other components
    await this.$store.dispatch('content/hello');
    await this.$store.dispatch('content/content_lessons');
    await this.$store.dispatch('content/test_array');
    await this.$store.dispatch('content/test_array_2');
    await this.$store.dispatch('content/test_image');
  }
}

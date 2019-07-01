import { Component, Vue }   from 'vue-property-decorator';
import Nav                  from '@/components/Nav.vue'; // @ is an alias to /src
import { log }              from './logger';

@Component({
  name: 'app',
  components: {
    Nav,
  },
})
export default class App extends Vue {
  // Lifecycle
  public async created() {
    // Initial action dispatches are done here - its very
    // possible that other actions will be dispatched from
    // other components
    await this.$store.dispatch('content/hello');
    await this.$store.dispatch('content/content_tree'); // TODO: remove when many to one doc complete
    await this.$store.dispatch('content/content_providers');
    await this.$store.dispatch('content/content_lessons');
    await this.$store.dispatch('content/test_array');
    await this.$store.dispatch('content/test_array_2');
    await this.$store.dispatch('content/test_image');
  }
}

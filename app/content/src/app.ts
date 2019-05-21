import { Component, Vue }   from 'vue-property-decorator';
import Nav                  from '@/components/Nav.vue'; // @ is an alias to /src
import { log }              from './logger';
import qs                   from 'query-string';

@Component({
  name: 'app',
  components: {
    Nav,
  },
})
export default class App extends Vue {
  // Lifecycle
  public async created() {
    await this.$store.dispatch('content/hello')
  }
}

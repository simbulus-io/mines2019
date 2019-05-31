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
  // Mimicking what was given with new endpoints
  public async created() {
    await this.$store.dispatch('feedback/hello')
    // await this.$store.dispatch('feedback/al')
    // await this.$store.dispatch('feedback/view_names')
    await this.$store.dispatch('feedback/snotes')
//    await this.$store.dispatch('feedback/delete_snote')
  }
}

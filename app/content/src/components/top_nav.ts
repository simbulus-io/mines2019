import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class TopNav extends Vue {

  constructor() {
    super();
  }

  get display_name(): any {
    return 'Team Content';
  }
}

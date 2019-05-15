import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class TopNav extends Vue {

  constructor() {
    super();
  }

  get display_name(): any {
    // return this.$store.state.tutor.email
    // sneaky shorthand
    return 'Team Feedback';
  }
}

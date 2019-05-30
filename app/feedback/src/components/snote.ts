import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';

@Component
export default class Snote extends Vue {
  @Prop() private note!: Note;

  get get_date() {
    const d = new Date(this.note.timestamp);
    return d.toLocaleString();
  }
}
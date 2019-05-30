import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { log }        from '@/logger';

@Component
export default class Snote extends Vue {
  @Prop() private note!: Note;

  public get get_date() {
    const d = new Date(this.note.timestamp);
    return d.toLocaleString();
  }

  // public set delete_note( del: boolean ) {
  //   this.note.deleted = del;
  // }

  public delete_snote( e: any ){ //
    log.info('Calling delete_snote from Snote component');
    this.$store.dispatch( 'feedback/delete_snote', this.note.idx )
    //return this.$store.state.feedback.delete_snote; //idx
  }

}
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { log }        from '@/logger';

@Component
export default class Snote extends Vue {

  @Prop() private readonly note_idx!: string;

  public get note() {
    // Passing the this context as the second arg to JS find
    const rval = this.$store.state.feedback.snotes.find( (snote) => {
      return snote.idx === this.note_idx;
    }, this);
    return rval;
  }

  public get get_date() {
    const d = new Date(this.note.timestamp);
    return d.toLocaleString();
  }

  public get snote_class() {
    return !this.note.selected ? 'snote-active' : 'snote-inactive'
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
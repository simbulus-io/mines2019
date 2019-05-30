import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { log }        from '@/logger';

@Component
export default class Snote extends Vue {

  @Prop() private readonly note_idx!: string;
  public selected: boolean = false;

  public get get_note() {
    const snotes_arr = this.$store.state.feedback.snotes[this.note_idx]; // 
    log.info('***** Thing: '+ snotes_arr);
    return snotes_arr;
  }

  public get get_date() {
    const d = new Date(this.get_note.timestamp);
    return d.toLocaleString();
  }

  public get snote_class() {
    return !this.get_note.selected ? "snote-active" : "snote-inactive";
  }

  // public set delete_note( del: boolean ) {
  //   this.note.deleted = del;
  // }

  public delete_snote( e: any ){ //
    log.info('Calling delete_snote from Snote component');
    this.$store.dispatch( 'feedback/delete_snote', this.note_idx )
    //return this.$store.state.feedback.delete_snote; //idx
  }

}
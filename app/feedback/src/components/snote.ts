import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { log }        from '@/logger';
import vClickOutside from 'v-click-outside'

@Component({
  directives:{
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onClickOutside (event) {
      //console.log('Clicked outside. Event: ', event);
      log.info('Clicked outside');
    }
  }
})
export default class Snote extends Vue {

  public selected: boolean = false;
  @Prop() private readonly note_idx!: string;

  public get get_note() {
    // Passing the this context as the second arg to JS find
    const rval = this.$store.state.feedback.snotes.find( (snote) => {
      return snote.idx === this.note_idx;
    }, this);
    return rval;
  }

  public get get_date() {
    const d = new Date( this.get_note.timestamp);
    return d.toLocaleString();
  }

  // public get snote_class() {
  //   debugger;
  //   return !this.selected ? 'snote-active' : 'snote-inactive';
  // }

  public async delete_snote( ){ 
    log.info('Calling delete_snote from Snote component');
    const confirm_delete = confirm('Are you sure you want to delete the note:\n"'+this.get_note.content+'"');
    if( confirm_delete ){
      this.$store.dispatch( 'feedback/delete_snote', this.note_idx )

      const index = this.$store.state.feedback.snotes.indexOf( this.get_note );
      if( index >= 0 ){
        const bef_arr = Array.from(this.$store.state.feedback.snotes);
        this.$store.state.feedback.snotes.splice( index, 1 );
        const after_arr = Array.from(this.$store.state.feedback.snotes);
      }
    
    }

  }

}


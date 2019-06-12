import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { log }        from '@/logger';
import DragItDude from './DragItDude.vue';
import vClickOutside from 'v-click-outside';
//import Modal from './Modal.vue';
// from https://vuejsexamples.com/supler-simple-vue-js-draggable-component/


// declarative JSON blob format
// common on interwebs
@Component({ 
  components: {
    DragItDude,
  },
  directives:{
    clickOutside: vClickOutside.directive,
  },
}) 
// @(word) is a decorator (ES6 specced out JS doodada - meta programming concept, instruct runtime to create code for you ~ macro processor)
  // decorators we are using: @component @watch @prop
  // one is from vue decorators
  // => data members (no decroator) are reactive (in data block in declarative way)
  // => @prop - data member on the class with fancy decorator
  // => computed properties - method with getters
  // => @watch
// chose to do decorator approach bc future write the JS 
// makes vue code look more like classes -> easier (parallel to utility classes)
export default class Snote extends Vue {

  public selected: boolean = false;
  @Prop() private readonly note_idx!: string;

  public onClickOutside( event ){
    if(this.selected){
      // log.info('Clicked outside. Event: ', event);
      this.save_exit_snote();
    }
  }

  public get get_note() {
    // Passing the this context as the second arg to JS find
    const rval:Note = this.$store.state.feedback.snotes.find( (snote) => {
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
        this.$store.state.feedback.snotes.splice( index, 1 );
      }
    
    }

  }

  public async save_exit_snote( ){
    this.$store.dispatch( 'feedback/edit_snote', this );
    Vue.set(this, 'selected', false);
  }

  // public async move_snote_prompt( ){
  //   const new_x = Number(prompt('Please enter new x coordinate'));
  //   const new_y = Number(prompt('Please enter new y coordinate'));
  //   this.$store.dispatch( 'feedback/move_snote', [this, new_x, new_y] );
  // }
  
  public async move_snote( coordArr:any[] ){ // new_x:number, new_y:number
    log.info('changing to ('+coordArr[0]+', '+coordArr[1]+')');
    const new_x = coordArr[0];
    const new_y = coordArr[1];
    this.$store.dispatch( 'feedback/move_snote', [this, new_x, new_y] );
  }

}


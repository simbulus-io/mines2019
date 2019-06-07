import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
import { log }        from '@/logger';
//import vClickOutside from 'v-click-outside';
//import Modal from './Modal.vue';
// from https://vuejsexamples.com/supler-simple-vue-js-draggable-component/


// declarative JSON blob format
// common on interwebs
// 
@Component({ 
  // directives:{
  //   clickOutside: vClickOutside.directive,
  // },
  // methods: { // move click handler to TS class only put dependencies (other components) here
  //   onClickOutside (event) {
  //     //console.log('Clicked outside. Event: ', event);
  //     log.info('Clicked outside');
  //   }
  // }
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
        //const bef_arr = Array.from(this.$store.state.feedback.snotes);
        this.$store.state.feedback.snotes.splice( index, 1 );
        //const after_arr = Array.from(this.$store.state.feedback.snotes);
      }
    
    }

  }

  public async save_exit_snote( ){
    this.$store.dispatch( 'feedback/edit_snote', this );
    Vue.set(this, 'selected', false);
  }

}


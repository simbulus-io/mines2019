import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';
import { log }        from '@/logger';
import DragItDude from './DragItDude.vue';
import vClickOutside from 'v-click-outside';


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

  public get note() {
    // Passing the this context as the second arg to JS find
    const rval:Note = this.$store.state.feedback.snotes.find( (snote) => {
      return snote.idx === this.note_idx;
    }, this);
    return rval;
  }

  public get note_x() {
    const n = this.note;
    return n ? n.x : 0;
  }

  public get note_y() {
    const n = this.note;
    return n ? n.y : 0;
  }

  public get date() {
    const d = new Date( (this.note ? this.note.timestamp : 0));
    return d.toLocaleString();
  }

  public get note_deleted(){
    const n = this.note;
    return n ? n.deleted : true;
  }

  public get note_content(){
    const n = this.note;
    return n ? n.content : '';
  }

  public get note_author(){
    const n = this.note;
    return n ? n.author : '';
  }

  public selecting(e) {
    log.info('selecting snote');
    this.selected=true;
    // if( this.selected ){
    //   e.stopPropagation();
    // }else{
    //   this.selected=true;
    // }
  }


  public async delete_snote(e){
    log.info('Calling delete_snote from Snote component');
    const confirm_delete = confirm('Are you sure you want to delete the note:\n"'+this.note.content+'"');
    if( confirm_delete ){
      this.$store.dispatch( 'feedback/delete_snote', this.note_idx )

      const index = this.$store.state.feedback.snotes.indexOf( this.note );
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
  public handle_activate(e:Event,b) {
    log.info('activate');
    //this.selected=false;
  }

  public handle_dragging(e,b) {
    this.selected=false;
    log.info('dragging');
  }

  public handle_dropped(e,b) {
    this.selected=false;
    this.move_snote(e);
  }

  public move_snote( coordArr:any[] ){ // new_x:number, new_y:number
    log.info('changing to ('+coordArr[0]+', '+coordArr[1]+')');
    const new_x = coordArr[0];
    const new_y = coordArr[1];
    this.$store.dispatch( 'feedback/move_snote', {
      idx:this.note_idx,
      pt: {x:new_x, y:new_y}
     });
  }

}


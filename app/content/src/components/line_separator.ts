import { clone } from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';
import DragItDude from '@/components/vue-drag-it-dude'


//computed properties = getters
//store is for shared data and managing interactions with the server
//cannot overload opperators in javascript.  care about dot and bracket, 
//USE METHODS TO CHANGE STUFF IN VUE


@Component({
  components: {
    DragItDude
  },

})

export default class LineSeparator extends Vue {

  //this is how you declare reactive data
  private foo: string = 'yoda';



  constructor() {
    super();

  }

  public created() {

}


  // Computed
  public get text_in_div() {
  // First content identifies the store module
  // Second identifies the state member
  //this will change the value of foo after 5 seconds
  setInterval(() => {
    this.foo = String(document.getElementById('line1').offsetTop)
  }, 100);
  return this.foo;
}


}


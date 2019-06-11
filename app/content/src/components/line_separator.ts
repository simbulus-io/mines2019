import { clone } from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';
import DragItDude from '@/components/vue-drag-it-dude/src/DragItDude.vue';


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



  // Computed
  public text_in_div(element) {

    

  const rectangle = element.getBoundingClientRect();

  return rectangle.top;
}


}


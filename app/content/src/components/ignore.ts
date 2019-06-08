import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import DragItDude               from '@/vue-drag-it-dude'

@Component({
  components: {  
    DragItDude
  },
  
})

export default class LineSeparator extends Vue {
  

  constructor() {

    super();
    
  } 

  // Computed
  public get tex_in_div() {
    return this.foo;

    //Change foo after 5 seconds
    setTimeout(()=>{
      this.foo = 'darth vader'
    }, 5000)
  }
 
  //Declare reactive data
  private foo:string = 'yoda';


  

}
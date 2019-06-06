import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';

//computed properties = getters
//store is for shared data and managing interactions with the server
//cannot overload opperators in javascript.  care about dot and bracket, 
//USE METHODS TO CHANGE STUFF IN VUE

@Component({
  //what depends on me and what do i depend on 
  components: {
  }
})

export default class LineSeparator extends Vue {

 //this is how you declare reactive data
  private foo:string = 'yoda';
 
  constructor() {
    super();
    
  }
  public created() {

  }

  public mounted() {
    
  }
  // Computed
  public get text_in_div() {
    // First content identifies the store module
    // Second identifies the state member
    //this will change the value of foo after 5 seconds
    setTimeout(() => {
      this.foo='darth vader'}, 5000);
    return this.foo;
  }

}

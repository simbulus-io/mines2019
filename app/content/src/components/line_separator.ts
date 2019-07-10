import { Component, Prop, Vue } from 'vue-property-decorator';
import DragItDude               from '@/components/DragItDude.vue';
import { Post }                 from './post';
import { API_BASE_URL }         from '@/config'

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

  public line_data = [
    {
      y:'10',
      idx:0,
    },
    {
      y:'200',
      idx:1,
    },
    {
      y:'455',
      idx:3,
    },
    {
      y:'50',
      idx:4,
    }
  ]

  @Prop() private post!: Post;

  //this is how you declare reactive data
  constructor() {
    super();

  }


  //Returns the distance of each line from the top of document
  public get_location(){
    let i:number;
    const lines = document.getElementsByClassName('line');

    const margin = 25/2;
    const displacement: number[] = [];
    for (i=0;i<lines.length;i++) {
      displacement[i] = (lines[i].getBoundingClientRect().top - (lines[i].getBoundingClientRect().height/2) - margin);
      if (displacement[i] < 0){
        displacement[i] = 0;
      }
    }

    displacement.sort();
    this.JSONify(displacement);
    console.log(displacement);
  }

  public JSONify(arr){
    const data = JSON.stringify(arr);
  return data;
  }

  public poll(){
    //Poll api
    const interval = setInterval(() => {this.request(interval); console.log('i')},6000)
  }

  public request(interval){
    fetch(`${API_BASE_URL}`, {
      method: 'GET'
    })
    clearInterval(interval)
  }

  // TODO: functionality submit button
  public submit_locations(line_data: any[]) {
    alert('You hit submit!');
  }
}
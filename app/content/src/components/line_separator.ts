import { Component, Vue } from 'vue-property-decorator';
import DragItDude from '@/components/DragItDude.vue';


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
      y:'47',
      idx:0,
    },
    {
      y:'147',
      idx:1,
    }
  ]

  //this is how you declare reactive data
  constructor() {
    super();

  }


  //Returns the distance of each line from the top of document
  public get_location(){
    let i:number;
    const lines = document.getElementsByClassName('line');
    //Inital offset of lines with respect to page
    const lineOffset = 90;

    for (i=0;i<lines.length;i++) {
      const line = lines[i] as HTMLDivElement;
      console.log(line.getBoundingClientRect().top -lineOffset + window.pageYOffset);

    }
}

  // Computed

public position_lines(){

  const data = this.JSONify(47, 147, 247);


}

public JSONify(x,y,z){
  const data = JSON.stringify({seg1:x,
                               seg2:y,
                               seg3:z,
});
return data;
}

}



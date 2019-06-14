import { clone } from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';
import DragItDude from '@/components/DragItDude.vue';
import { Post } from './post';


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
    var i:number;
    let line:any;
    let lines = document.getElementsByClassName('line');
    //Inital offset of lines with respect to page
    let lineOffset = 90;
    let data;

    for (i=0;i<lines.length;i++) {
      let line = lines[i] as HTMLDivElement;
      console.log(line.getBoundingClientRect().top -lineOffset + window.pageYOffset);
      let data = JSON.stringify({line_position: line.getBoundingClientRect().top -100 + window.pageYOffset});
      
    }
}

  // Computed

public position_lines(){
  
  let data = this.JSONify(47, 147, 247);

  let newData: linePositions =  JSON.parse(data);

}

public JSONify(x,y,z){
  const data = JSON.stringify({seg1:x,
                               seg2:y,
                               seg3:z,
});
return data;
}

}

interface linePositions {
  seg1: number;
  seg2: number;
  seg3: number;
}

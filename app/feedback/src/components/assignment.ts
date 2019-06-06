import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import Snote from './Snote.vue';
import { Note } from './note';
import {Guid} from 'guid-typescript'

// var div = document.getElementsByClassName('bgimg')[0];
// var img = document.createElement('img');
// img.onload = function() {
//   div.style.backgroundImage = "url('"+img.src+"')";
//   div.style.width = img.width+"px";
//   div.style.height = img.height+"px";
// }
// img.src = "https://www.wootmath.com/dds/52/52/d41ad5a1ea4688cc7b0f1a710821.png";

@Component({
  components: {
    MainContent,
    Snote,
  }
})

export default class Assignment extends Vue {
    //private image_path = require('../../public/kitten.jpg');
    private image_path = require('../../public/sample_wkst.jpg');

    constructor() {
      super();
    }

    // snotes 5/29
    public get snotes(){
        return this.$store.state.feedback.snotes;
    }

    public get get_image_path(){
        return this.image_path;
    }

    public create_snote(){
      const new_idx = Guid.raw();
      const new_note:Note = {
        idx: new_idx,
        author: 'TODO',
        content: 'Write Your Feedback Here',
        type: 'snote',
        timestamp: 10,//Date.now(),
        x: 10,
        y: 10,
        deleted: false
      };
      // let new_note:String;
      // new_note = '{ ';
      // new_note += 'idx: "' + Guid.raw() + '", ';
      // new_note += 'author: "' + 'TODO' + '", ';
      // new_note += 'content: "' + 'Write Your Feedback Here!' + '", ';
      // new_note += 'type: "' + 'snote' + '", ';
      // new_note += 'timestamp: "' + Date.now() + '", ';
      // new_note += 'x: ' + '10' + ', ';
      // new_note += 'y: ' + '10' + ', ';
      // new_note += 'deleted: ' + 'false';
      // new_note += '}';
      // //const json_note = JSON.stringify(new_note);
      //this.$store.dispatch( 'feedback/create_snote', json_note );
      this.$store.dispatch( 'feedback/create_snote', new_note );
    }

}

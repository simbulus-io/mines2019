import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import Snote from './Snote.vue';
import { Note } from './note';

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

}

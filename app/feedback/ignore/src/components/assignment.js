import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import Snote from './Snote.vue';
// var div = document.getElementsByClassName('bgimg')[0];
// var img = document.createElement('img');
// img.onload = function() {
//   div.style.backgroundImage = "url('"+img.src+"')";
//   div.style.width = img.width+"px";
//   div.style.height = img.height+"px";
// }
// img.src = "https://www.wootmath.com/dds/52/52/d41ad5a1ea4688cc7b0f1a710821.png";
let Assignment = class Assignment extends Vue {
    constructor() {
        super();
        //private image_path = require('../../public/kitten.jpg'); 
        this.image_path = require('../../public/sample_wkst.jpg');
    }
    // snotes 5/29
    get snotes() {
        return this.$store.state.feedback.snotes;
    }
    get get_image_path() {
        return this.image_path;
    }
};
Assignment = tslib_1.__decorate([
    Component({
        components: {
            MainContent,
            Snote,
        }
    })
], Assignment);
export default Assignment;
//# sourceMappingURL=assignment.js.map
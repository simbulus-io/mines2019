import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import Snote from './Snote.vue';
import { Note } from './note';
import {Guid} from 'guid-typescript'

@Component({
  components: {
    MainContent,
    Snote,
  }
})
export default class TeacherAssignment extends Vue {
    //private image_path = require('../../public/kitten.jpg');
    //private image_path = require('../../public/sample_wkst.jpg');

    constructor() {
      super();
    }

    // snotes 5/29
    public get snotes(){
        return this.$store.state.feedback.snotes;
    }

    public get get_image_path(){
        const assign = this.get_assignment;
        return assign.url;
        //return this.image_path;
    }

    private get get_assignment() {
        // Passing the this context as the second arg to JS find
        const rval = this.$store.state.feedback.assignments.find( (assig) => {
            return assig.idx === this.$route.params.idx;
        }, this);
        return rval;
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
      this.$store.dispatch( 'feedback/create_snote', new_note );
    }

}

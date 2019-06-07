import { Component, Prop, Vue  }    from 'vue-property-decorator';
import MainContent                  from '@/components/MainContent.vue';
import StudentSnote                 from './StudentSnote.vue';
import { Note }                     from './note';
import {Guid}                       from 'guid-typescript';

@Component ({
    components:{
        MainContent,
        StudentSnote
    }
})
export default class StudentAssignment extends Vue{
    private image_path = require('../../public/wkst.jpg');

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
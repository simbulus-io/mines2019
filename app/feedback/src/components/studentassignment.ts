import Assignment from './assignment';
import StudentSnote from './StudentSnote.vue'
import { Component } from 'vue-property-decorator';

@Component ({
    components:{
        StudentSnote
    }
})

export default class StudentAssignment extends Assignment{
    
}
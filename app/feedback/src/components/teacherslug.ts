import { clone }                from 'lodash-es';
import * as _                   from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import TeacherAccordion         from '@/components/TeacherAccordion.vue';


import Slug from './slug';
import { AssignmentObj } from './assignmentobj';

@Component({
  components: {
    MainContent,
    //AssignmentThumb,
    TeacherAccordion
  }
})
export default class TeacherSlug extends Slug {
  public get assignments(){
    //log.info(this.$store.state.feedback.assignments);
    return this.$store.state.feedback.assignments;
  }

  public get assignment_titles(){

    const groups = new Set();
    const assigns = this.assignments;
    assigns.forEach(element => {
      groups.add(element.title);
    });
    return Array.from(groups.values());
    // couldn't get this working, possible TODO: change above to below and get working

    // const groups = _.reduce(assigns, (memo: any[], value:AssignmentObj) => {
    //   // initialize group if necessary
    //   if( !memo[value.assignment_idx] ) {
    //     memo[value.assignment_idx] = [];
    //   }
    //   // accumulate using shared index
    //   memo[value.assignment_idx].push(value);
    //   // don't forget to return accumulator
    //   return memo;
    // }, []);
    // return groups;
    //return assigns;
    //return ['meow', 'woof', 'bearz'];
  }

  public assignment_idx ( title:string ) {
    const rval = this.assignments.find( (assig) => {
      return assig.title === title;
    }, this);
    return rval.assignment_idx;
  }

}

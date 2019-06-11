import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

@Component({})
export default class Accordion extends Vue {

//title of individual slug
@Prop() 
private title;
//if slug is expanded or not
private active = false;
//what is within the slug
@Prop()
private content;

public get getTitle(){
    return this.title;
}
public get getActive(){
    return this.active;
}
//something
// public setContent(){
//     this.content;
// }
//asserts type of retrieved content

public typeContent() {
    if (this.content instanceof Array) {
        return Array;
    }
    else {
        return this.content;
    }
}
public get getContent(){
    return this.content;
}

}
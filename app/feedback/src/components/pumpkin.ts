import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';
import accordion                from '@/components/accordion.vue';
//import CKEditor from '@ckeditor/ckeditor5-vue';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import accordion from './accordion'
//https://vuejsexamples.com/simple-and-smooth-vue-accordion/
//import VueFaqAccordion from 'vue-faq-accordion'
import { __values } from 'tslib';

//Vue.use(CKEditor);

@Component({
  components:  {
    MainContent,
    //VueFaqAccordion,
    accordion
  }
})

export default class Pumpkin extends Vue {
  public sNoteEle = [
    {
      assignment: 'Math 1',
      details: '1 new sticky note',
      image: './pumpImage.png',
      exclamation: false,
    },
    {
      assignment: 'Math 2',
      details: '1 new sticky note',
      image: './pumpImage.png',
      exclamation: false,
    }
  ]
  public trick = [
    {
      title: 'What do mummies like listening to on Halloween?',
      value: 'Wrap music!',
      category: '' 
    },
    {
      title: 'What are a ghost\'s favorite rides at the fair?',
      value: 'The scary-go-round and rollerghoster!',
      category: '' 
    }
  ]
  //public editor=ClassicEditor;
  // public editorData='<p>Tongue of Toad</p>';
  // public editorConfig={};
  constructor() {
    super();
  }
  // The configuration of the editor.

  // Computed
  // public get hello_mines() {
  //   return this.$store.state.feedback.hello;
  // }


  // public Bold() {
  //   this.editorData = '<strong>' + this.editorData + '</strong>';
  // }
  // public Italics() {
  //   this.editorData = '<i>' + this.editorData + '</i>';
  // }
  // public Smash() {
  //   this.editorData = '';
  // }
  // public Plant() {
  //   this.editorData = 'Tongue of Toad';
  // }
  //Lacking underline & Strikethrough implementation
  // public Underline() {
  //   this.editorData = '<u>'+ this.editorData + '</u>';
  // }
  // public Strikethrough() {
  //   this.editorData = '<s>'+ this.editorData + '</s>';
  // }

  // Written by alex to be referenced by the Other.vue file,
  //    references feedback.ts
  public get alex(){
    return this.$store.state.feedback.al;
    //return "Alex cries";
  }

  public get pumpkin() {
    return 'Witch\'s Brew' ;
  }

  public get pumpDetails(){
    return this.$store.state.feedback.pumpDetails;
}

}

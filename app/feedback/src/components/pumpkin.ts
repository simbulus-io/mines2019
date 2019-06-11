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

@Component({
  components:  {
    MainContent,
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

  constructor() {
    super();
  }

}

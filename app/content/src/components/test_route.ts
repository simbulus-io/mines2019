import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';



@Component({
  components: {
    MainContent,
  }
})

export default class TestRoute extends Vue {
  private selected_file: any;
  
  constructor() {
    super();
  }

  public on_file_selected(event){
    this.selected_file = event.target.files[0]
  }

  public on_upload(){
    fetch('http://localhost:5101/content/v1.0/store_file_upload', {
      method: 'POST',
      body: this.selected_file
    })
  }

  // Computed
  public get hello_mines() {
    // First content identifies the store module
    // Second identifies the state member
    return this.$store.state.content.hello;
  }

  // Computed
  public get test_array() {
    return this.$store.state.content.test_array;
  }
  
  public get test_array_2() {
    return this.$store.state.content.test_array_2;
  }
  
  public get test_image() {
    return this.$store.state.content.test_image;
  }

}

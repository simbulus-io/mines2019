import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from './note';

@Component
export default class Snote extends Vue {
  @Prop() private note!: Note;

//   get date() {
//     return `${this.post.datePosted.getDate()}/${this.post.datePosted.getMonth()}/${this.post.datePosted.getFullYear()}`;
//   }
}
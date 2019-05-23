import { Component, Prop, Vue } from 'vue-property-decorator';
import { Post } from './post';

@Component
export default class BlogPost extends Vue {
	@Prop() private post!: Post;

	get date() {
		return `${this.post.datePosted.getDate()}/${this.post.datePosted.getMonth()}/${this.post.datePosted.getFullYear()}`;
	}
}
import { clone }                from 'lodash-es';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainContent              from '@/components/MainContent.vue';
import { log }                  from '@/logger';

import BlogPost from './BlogPost.vue';
import { Post } from './post';
import { Request, Response } from "express";

@Component({
  components: {
    MainContent,
    BlogPost,
  }
})

export default class Dashboard extends Vue {
  constructor() {
    super();
  }

  // Computed
  public get hello_mines() {
    return this.$store.state.feedback.test_data;
  }

  private blogPosts: Post[] = [
		{
			title: 'My first blogpost ever!',
			body: 'Lorem ipsum dolor sit amet.',
			author: 'Elke',
			datePosted: new Date(2019, 1, 18),
		},
		{
			title: 'Look I am blogging!',
			body: 'Hurray for me, this is my second post!',
			author: 'Elke',
			datePosted: new Date(2019, 1, 19),
		},
		{
			title: 'Another one?!',
			body: 'Another one!',
			author: 'Elke',
			datePosted: new Date(2019, 1, 20),
		},
	];
}

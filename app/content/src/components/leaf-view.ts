import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Lesson } from './lesson';
import VueTagsInput from '@johmun/vue-tags-input'; // from http://www.vue-tags-input.com/#/


@Component({
    components: {
        VueTagsInput,
    }
  })
export default class LeafView extends Vue {
    constructor() {
        super();
    }

    public tag: string = '';
    public tags: string[] = [];

    @Prop() public readonly lesson_id!: string;

    public get lesson() {
        const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
            return lesson._id === this.lesson_id;
          }, this);
        return rval;
    }

    public get lesson_notes(){
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.notes : [];
    }

    public get lesson_status() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.status : [];
    }

    public get lesson_keywords() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.keywords : [];
    }
}
import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';
import { Lesson } from './lesson';
import { VueTagsInput, createTags } from '@johmun/vue-tags-input'; // from http://www.vue-tags-input.com/#/


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

    @Prop() public readonly lesson_idx!: string;

    public get validated_tags() {
        return createTags(this.lesson_keywords);
    }

    public get lesson() {
        const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
            return lesson.idx === this.lesson_idx;
          }, this);
        return rval;
    }

    public get lesson_module() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.module : '-1';
    }

    public get lesson_provider() {
        const lesson: Lesson = this.lesson;
        const provider_idx: string = lesson ? lesson.content_provider_idx : 'UNKNOWN';
        const prov = this.$store.state.content.content_providers.find( (provider) => {
            return provider.idx === provider_idx;
        });
        return prov ? prov.name : 'UNKNOWN';
    }

    public get lesson_grade() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.grade : 'UNKNOWN';
    }

    public get lesson_number() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.number : '-1';
    }

    public get lesson_notes(){
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.notes : [];
    }

    public set lesson_status( new_status: string) {
        this.$store.dispatch( 'content/update_lesson_status', {
            idx: this.lesson_idx,
            status: new_status,
        });
    }

    public get lesson_status() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.status : '';
    }

    public get lesson_keywords() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.keywords : [];
    }

    public update_keywords( newTags: any[] ) {
        //log.info(`update_keywords: ${newTags}`);
        let string_tags: string[] = [];
        newTags.forEach(keyword => {
            const text = keyword ? keyword.text : '';
            string_tags.push(text);
        });
        //log.info(`update_keywords: ${string_tags}`);
        this.$store.dispatch( 'content/update_lesson_keywords', {
            idx: this.lesson_idx,
            keywords: string_tags,
        });
    }
}
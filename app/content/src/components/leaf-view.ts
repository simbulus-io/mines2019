import { Component, Prop, Vue }         from 'vue-property-decorator';
import { log }                          from '@/logger';
import { Lesson }                       from './lesson';
import { VueTagsInput, createTags }     from '@johmun/vue-tags-input'; // from http://www.vue-tags-input.com/#/
import {Guid}                      from 'guid-typescript';

@Component({
    components: {
        VueTagsInput,
    }
  })
export default class LeafView extends Vue {
    constructor() {
        super();
        this.selected_note = '';
    }

    public tag: string = '';
    public selected_note: string;

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

    public get lesson_name() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.name : 'UNKNOWN';
    }

    public get lesson_path() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.path : 'UNKNOWN';
    }

    public get lesson_notes() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.notes : [];
    }

    public note_selected(note_idx:string) {
        if ( note_idx === this.selected_note ) {
            return true;
        } else {
            return false;
        }
    }

    public edit_note( note_idx: string ){
        this.selected_note = note_idx;
    }

    // TODO: what to do with the text since 2 way binding?
    public save_note( note_idx: string, note_text: string){
        log.info(` in save_note: ${note_text}`);
        this.selected_note = '';
        this.$store.dispatch( 'content/update_lesson_note', {
            lesson_idx: this.lesson_idx,
            note_idx: note_idx,
            text: note_text
        });
    }

    public delete_note( note_idx: string ){
        if ( this.selected_note === note_idx ) {
            this.selected_note = '';
        }
        this.$store.dispatch( 'content/delete_lesson_note', {
            lesson_idx: this.lesson_idx,
            note_idx: note_idx,
        });
    }

    public new_note(){
        const new_note_idx = Guid.raw();
        this.$store.dispatch( 'content/add_lesson_note', {
            lesson_idx: this.lesson_idx,
            note_idx: new_note_idx,
        });
        this.edit_note( new_note_idx );
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
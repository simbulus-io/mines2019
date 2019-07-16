import { Component, Prop, Vue }         from 'vue-property-decorator';
import { log }                          from '@/logger';
import { Lesson }                       from './lesson';
import { VueTagsInput, createTags }     from '@johmun/vue-tags-input'; // from http://www.vue-tags-input.com/#/
import StandardBlock                    from './StandardBlock.vue';
import { STATUS_VALUES }                from './status_values';
import { stringify } from 'querystring';

@Component({
    components: {
        VueTagsInput,
        StandardBlock,
    },
    directives: {
        focus: {
          inserted: function (el) {
            el.focus()
          }
        }
      },
  })
export default class LeafView extends Vue {
    constructor() {
        super();
        this.selected_note = -1;
    }

    public tag: string = '';
    public selected_note: number;
    public local_keywords: string[] = [];
    public readonly STATUS_VALUES: string[] = STATUS_VALUES;

    private autocompleteItems = [
        'Counting and Cardinality',
        'Operations and Algebraic Thinking',
        'Number and Operations',
        'Number and Operations - Base Ten',
        'Number and Operations - Fractions',
        'Measurement and Data',
        'Geometry',
        'Ratios and Proportional Relationships',
        'The Number System',
        'Expressions and Equations',
        'Functions',
        'Statistics and Probability',
        'Pre-algebra',
        'Algebra',
        'Functions',
        'Modeling',
        'Trigonometry',
        'Pre-calculus',
        'Calculus',
        'Differential Equations',
    ];

    @Prop() public readonly lesson_id!: string;

    public get validated_tags() {
        return createTags(this.lesson_keywords);
    }

    public get lesson() {
        const rval: Lesson = this.$store.state.content.content_lessons.find( (lesson) => {
            return lesson._id === this.lesson_id;
          }, this);
        return rval;
    }

    public get lesson_notes() {
        const lesson: Lesson = this.lesson;
        const simple_notes: string[] = lesson ? lesson.notes : [];
        const obj_notes :{ index: number, text: string }[] = [];
        let i = 0;
        //log.info(simple_notes);
        simple_notes.forEach((note: string) => {
            //log.info(`Note: index = ${i} text = ${note}`);
            const obj_note = {
                index: i,
                text: note,
            };
            obj_notes.push(obj_note);
            i++;
          });
        return obj_notes;
    }

    public note_selected(note_index:number) {
        if ( note_index === this.selected_note ) {
            return true;
        } else {
            return false;
        }
    }

    public edit_note( note_index: number ){
        this.selected_note = note_index;
    }

    // TODO: what to do with the text since 2 way binding?
    // is passing it correct??
    public save_note( note_index: string, note_text: string){
        this.selected_note = -1;
        this.$store.dispatch( 'content/update_lesson_note', {
            _id: this.lesson_id,
            note_index: note_index,
            text: note_text
        });
    }

    public delete_note( note_index: number, note_text: string ){
        const confirm_delete = confirm('Are you sure you want to delete the note:\n"'+note_text+'"');
        if (confirm_delete) {
            this.selected_note = -1;
            this.$store.dispatch( 'content/delete_lesson_note', {
                _id: this.lesson_id,
                note_index: note_index,
            });
        }
    }

    public new_note(){
        const new_note_index : number = this.lesson_notes.length;
        this.$store.dispatch( 'content/add_lesson_note', {
            _id: this.lesson_id,
        });
        this.edit_note( new_note_index );
    }

    public set lesson_status( new_status: string) {
        this.$store.dispatch( 'content/update_lesson_status', {
            _id: this.lesson_id,
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

    public get lesson_standards() {
        const lesson: Lesson = this.lesson;
        return lesson ? lesson.standards : [];
    }

    // searching through all lessons in store takes awhile -> only update store in batch for keywords
    // triggered on blur -> doesn't matter if user directly refreshes or leaves the page
    public update_store_keywords( ) {
        log.info(`Update store keywords triggered with ${this.lesson_id}`);
        log.info(this.$store.state.content.content_lessons);
        const index = this.$store.state.content.content_lessons.findIndex(less => less._id === this.lesson_id );
        const lesson = this.$store.state.content.content_lessons[index];
        lesson.keywords = this.local_keywords;
        Vue.set(this.$store.state.content.content_lessons,index,lesson);
    }

    public update_keywords( newTags: any[]) {
        let string_tags: string[] = [];
        newTags.forEach(keyword => {
            const text = keyword ? keyword.text : '';
            string_tags.push(text);
        });
        this.local_keywords = string_tags;
        this.$store.dispatch( 'content/update_lesson_keywords', {
            _id: this.lesson_id,
            keywords: string_tags,
        });
    }

    public get filteredItems() {
        const complex_arr: {text: string}[] = [];
        this.autocompleteItems.forEach(word => {
            complex_arr.push({text: word});
        });
        return complex_arr.filter(i => {
            return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
    }
}
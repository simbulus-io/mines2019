import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';


@Component
export default class LeafView extends Vue {
    constructor() {
        super();
    }

    @Prop() public readonly content!: any;
    @Prop() public readonly processed!: boolean;

    public get key() {
        if(this.content!==null){
            return this.content.key;
        }
        return '';
    }

    public get value() {
        if(this.content!==null){
            return this.content.value;
        }
        return '';
    }

    public get path() {
        if(this.content!==null){
            return this.content.path;
        }
        return '';
    }

    public get parse_path() {
        const parsed: string[] = this.path.split('.');
        if( parsed !== undefined && parsed.length >= 5 ){
            const prov = this.$store.state.content.content_providers.find( (provider) => {
                return provider.name === parsed[1];
            });
            const pprovid = prov ? prov._id : -1;
            const pgrade = parsed[2];
            const pmodule_arr = parsed[3].match(/\d+/g)
            const pmodule =  pmodule_arr ? pmodule_arr[0] : -1;
            const pnumber_arr = parsed[4].match(/\d+/g);
            const pnumber = pnumber_arr ? pnumber_arr[0] : -1;
            return {
                content_provider_id : pprovid,
                grade: pgrade,
                module: pmodule,
                number: pnumber,
            };
        }
        return { // TODO: is there a better not found rval?
            content_provider_id : -1,
            grade: -1,
            module: -1,
            number: -1,
        };
    }

    public get find_db_lesson_id() {
        const parsed = this.parse_path;
        if( parsed !== null ) {
            const rval = this.$store.state.content.content_lessons.find( (lesson) => {
                return lesson.content_provider_id === parsed.content_provider_id &&
                        lesson.grade === parsed.grade &&
                        lesson.module === parsed.module &&
                        lesson.number === parsed.number;
            }, this);
            return rval ? rval._id : -1;
        }
    }

}
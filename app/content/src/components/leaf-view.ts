import { Component, Prop, Vue } from 'vue-property-decorator';
import { log }                  from '@/logger';


@Component
export default class LeafView extends Vue {
    constructor() {
        super();
    }

    @Prop() public readonly lesson_id!: string;
}
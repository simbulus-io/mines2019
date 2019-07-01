import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LeafView extends Vue {
    constructor() {
        super();
    }

    @Prop() public readonly content!: any;
    @Prop() public readonly processed!: boolean;

}
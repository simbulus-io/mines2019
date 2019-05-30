import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
let Other = class Other extends Vue {
    constructor() {
        super();
    }
    // Computed
    get hello_mines() {
        return this.$store.state.feedback.hello;
    }
    // Written by alex to be referenced by the Other.vue file,
    //    references feedback.ts
    get alex() {
        return this.$store.state.feedback.al;
        //return "Alex cries";
    }
};
Other = tslib_1.__decorate([
    Component({
        components: {
            MainContent,
        }
    })
], Other);
export default Other;
//# sourceMappingURL=other.js.map
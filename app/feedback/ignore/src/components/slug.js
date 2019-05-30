import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import SnoteSlug from './SnoteSlug.vue';
let Slug = class Slug extends Vue {
    constructor() {
        super();
    }
    // get collection of sticky notes from api from db
    get snotes() {
        return this.$store.state.feedback.snotes;
    }
};
Slug = tslib_1.__decorate([
    Component({
        components: {
            MainContent,
            SnoteSlug,
        }
    })
], Slug);
export default Slug;
//# sourceMappingURL=slug.js.map
import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
let TopNav = class TopNav extends Vue {
    constructor() {
        super();
    }
    get display_name() {
        // return this.$store.state.tutor.email
        // sneaky shorthand
        return 'Team Feedback';
    }
};
TopNav = tslib_1.__decorate([
    Component({})
], TopNav);
export default TopNav;
//# sourceMappingURL=top_nav.js.map
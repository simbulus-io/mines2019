import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import { log } from '@/logger';
let LeftNav = class LeftNav extends Vue {
    constructor() {
        super();
    }
    created() {
        log.info(this.$route);
    }
};
LeftNav = tslib_1.__decorate([
    Component
], LeftNav);
export default LeftNav;
//# sourceMappingURL=left_nav.js.map
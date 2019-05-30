import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import MainContent from '@/components/MainContent.vue';
import BlogPost from './BlogPost.vue';
let Dashboard = class Dashboard extends Vue {
    constructor() {
        super();
    }
    // Computed
    get hello_mines() {
        return this.$store.state.feedback.test_data;
    }
    get view_names() {
        return this.$store.state.feedback.view_names;
    }
};
Dashboard = tslib_1.__decorate([
    Component({
        components: {
            MainContent,
            BlogPost,
        }
    })
], Dashboard);
export default Dashboard;
//# sourceMappingURL=dashboard.js.map
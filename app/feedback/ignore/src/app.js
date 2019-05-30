import * as tslib_1 from "tslib";
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue'; // @ is an alias to /src
let App = class App extends Vue {
    // Lifecycle
    // Mimicking what was given with new endpoints
    async created() {
        await this.$store.dispatch('feedback/hello');
        // await this.$store.dispatch('feedback/al')
        // await this.$store.dispatch('feedback/view_names')
        await this.$store.dispatch('feedback/snotes');
        //    await this.$store.dispatch('feedback/delete_snote')
    }
};
App = tslib_1.__decorate([
    Component({
        name: 'app',
        components: {
            Nav,
        },
    })
], App);
export default App;
//# sourceMappingURL=app.js.map
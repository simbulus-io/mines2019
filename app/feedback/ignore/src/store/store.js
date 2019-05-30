import Vue from 'vue';
import Vuex from 'vuex';
import { feedback } from '@/store/feedback';
Vue.use(Vuex);
export const tutor_state = {
    version: '1.0'
};
export default new Vuex.Store({
    modules: {
        feedback,
    }
});
//# sourceMappingURL=store.js.map
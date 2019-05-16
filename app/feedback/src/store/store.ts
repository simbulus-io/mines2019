import Vue            from 'vue';
import Vuex           from 'vuex';
import { RootState }  from '@/store/types';
import { feedback }   from '@/store/feedback';

Vue.use(Vuex);

export const tutor_state: RootState = {
  version: '1.0'
}

export default new Vuex.Store<RootState>({
  modules: {
    feedback,
  }
});

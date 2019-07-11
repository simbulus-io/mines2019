import Vue                 from 'vue';
import { library }         from '@fortawesome/fontawesome-svg-core';
import { faBars,
         faUsers,
         faStream,
         faCalendarAlt,
         faComments,
         faUserCircle,
         faTimesCircle,
         faFolder,
         faHome,
         faPlusCircle,
         faTrash,
         faCaretRight,
         faSadTear,
        }                  from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App                 from '@/App.vue';
import router              from '@/router';
import store               from '@/store/store';
import { log }             from '@/logger';
import { API_BASE_URL }    from '@/config';

export async function load_app() {

  // Pull in icons here
  library.add(faBars,
              faHome,
              faUsers,
              faStream,
              faCalendarAlt,
              faComments,
              faUserCircle,
              faTimesCircle,
              faFolder,
              faPlusCircle,
              faTrash,
              faCaretRight,
              faSadTear,
              );

  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.config.productionTip = false;
  log.info('Loading Vue App');

  new Vue({
    router,
    store,
    render: (h) => h(App),
    created: () => {
      log.info('Jester Starting Up')
      log.info(`API_BASE_URL ${API_BASE_URL}`);
    },
  }).$mount('#content-app');

};

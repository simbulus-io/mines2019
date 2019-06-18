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
        }                  from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App                 from '@/App.vue';
import router              from '@/router';
import store               from '@/store/store';
import { log }             from '@/logger';

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
              );

  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.config.productionTip = false;
  log.info('Loading Vue App');

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#content-app');

};

import Vue             from 'vue';
import Router          from 'vue-router';
import LessonDetails   from '@/components/LessonDetails.vue';
import BatchProcess   from '@/components/BatchProcess.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    // ex. { path: '/from', redirect: '/to', },
    // Routes
    { path: '/',      name: 'lesson_details',      component: LessonDetails, },
    { path: '/batch',  name: 'batch_process',      component: BatchProcess, },
  ],
});

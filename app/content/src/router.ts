import Vue             from 'vue';
import Router          from 'vue-router';
import LessonDetails   from '@/components/LessonDetails.vue';
import Ingest          from '@/components/Ingest.vue';
import Segment         from '@/components/Segment.vue';
import FileUpload      from '@/components/FileUpload.vue';
import EditSegments    from '@/components/EditSegments.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    // ex. { path: '/from', redirect: '/to', },
    // Routes
    { path: '/',      name: 'lesson_details',      component: LessonDetails, },
  ],
});

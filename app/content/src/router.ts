import Vue            from 'vue';
import Router          from 'vue-router';
import Dashboard       from '@/components/Dashboard.vue';
import Ingest          from '@/components/Ingest.vue';
import Segment         from '@/components/Segment.vue';
import FileUpload      from '@/components/FileUpload.vue';
import EditSegments    from '@/components/EditSegments.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'ingest', },
    // Routes
    { path: '/ingest',         name: 'ingest',         component: Ingest, },
    { path: '/segment',        name: 'segment',        component: Segment, },
    // { path: '/dashboard',      name: 'dashboard',      component: Dashboard, },
    // { path: '/file_upload',    name: 'file_upload',    component: FileUpload, },
    // { path: '/edit_segments',  name: 'edit_segments',  component: EditSegments, },
  ],
});

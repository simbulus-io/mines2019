import Vue            from 'vue';
import Router         from 'vue-router';
import Dashboard      from '@/components/Dashboard.vue';
import Other          from '@/components/Other.vue';
import FileUpload from '@/components/FileUpload.vue';
import EditSegments from '@/components/EditSegments.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'dashboard', },
    // Routes
    { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    { path: '/other',       name: 'other',       component: Other, },
    { path: '/file_upload',       name: 'file_upload',       component: FileUpload, },
    { path: '/edit_segments',       name: 'edit_segments',       component: EditSegments, },
  ],
});

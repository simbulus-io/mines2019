import Vue            from 'vue';
import Router         from 'vue-router';
import Dashboard      from '@/components/Dashboard.vue';
import Other          from '@/components/Other.vue';
import TestRoute from '@/components/TestRoute.vue';
import EditSegments from '@/components/EditSegments.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'dashboard', },
    // Routes
    { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    { path: '/other',       name: 'other',       component: Other, },
    { path: '/test_route',       name: 'testroute',       component: TestRoute, },
    { path: '/edit_segments',       name: 'edit_segments',       component: EditSegments, },
  ],
});

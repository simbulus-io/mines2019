import Vue            from 'vue';
import Router         from 'vue-router';
import Dashboard      from '@/components/Dashboard.vue';
import Other          from '@/components/Other.vue';
import Slug          from '@/components/Slug.vue';
Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'dashboard', },
    // Routes
    { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    { path: '/other',       name: 'other',       component: Other, },
    { path: '/slug',       name: 'slug',       component: Slug, },
  ],
});

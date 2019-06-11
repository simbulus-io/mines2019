import Vue            from 'vue';
import Router         from 'vue-router';
import Dashboard      from '@/components/Dashboard.vue';
import Other          from '@/components/Other.vue';
import Slug           from '@/components/Slug.vue';
import StudentAssignment  from '@/components/StudentAssignment.vue';
import TeacherSlug    from './components/TeacherSlug.vue';
import TeacherAssignment   from './components/TeacherAssignment.vue';

Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'dashboard', },
    // Routes
    { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    { path: '/other',       name: 'other',       component: Other, },
    { path: '/slug',        name: 'slug',        component: Slug, },
    { path: '/student/assignment/:idx',  name: 'studentassignment',  component: StudentAssignment, },
    { path: '/teacher/slug',  name: 'teacherslug',  component: TeacherSlug, },
    { path: '/teacher/assignment/:idx',  name: 'teacherassignment',  component: TeacherAssignment, },
  ],
});

import Vue            from 'vue';
import Router         from 'vue-router';
// import Dashboard      from '@/components/Dashboard.vue';
// import Other          from '@/components/Other.vue';
import StudentAssignment  from '@/components/StudentAssignment.vue';
import TeacherSlug    from './components/TeacherSlug.vue';
import StudentSlug    from './components/StudentSlug.vue';
import TeacherAssignment   from './components/TeacherAssignment.vue';
Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'teacher/slug', },
    // Routes
    // { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    // { path: '/other',       name: 'other',       component: Other, },
    { path: '/student/assignment/:idx',  name: 'studentassignment',  component: StudentAssignment, },
    { path: '/teacher/slug',  name: 'teacherslug',  component: TeacherSlug, },
    { path: '/student/slug/:idx',  name: 'studentslug',  component: StudentSlug, },
    { path: '/teacher/assignment/:idx',  name: 'teacherassignment',  component: TeacherAssignment, },
  ],
});

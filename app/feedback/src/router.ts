import Vue            from 'vue';
import Router         from 'vue-router';
import Dashboard      from '@/components/Dashboard.vue';
import Other          from '@/components/Other.vue';
import Slug           from '@/components/Slug.vue';
import StudentAssignment  from '@/components/StudentAssignment.vue';
import TeacherSlug    from './components/TeacherSlug.vue';
import StudentSlug    from './components/StudentSlug.vue';
import TeacherAssignment   from './components/TeacherAssignment.vue';
import DrawingBoard   from './components/DrawingBoard.vue';
Vue.use(Router);

export default new Router({
  routes: [
    // Redirects
    { path: '/', redirect: 'dashboard', },
    // Routes
    { path: '/dashboard',   name: 'dashboard',   component: Dashboard, },
    { path: '/other',       name: 'other',       component: Other, },
    { path: '/student/assignment/:idx',  name: 'studentassignment',  component: StudentAssignment, },
    { path: '/teacher/slug',  name: 'teacherslug',  component: TeacherSlug, },
    { path: '/student/slug',  name: 'studentslug',  component: StudentSlug, },
    { path: '/teacher/assignment/:idx',  name: 'teacherassignment',  component: TeacherAssignment, },
    { path: '/drawingboard',  name: 'drawingboard',  component: DrawingBoard, },

  ],
});

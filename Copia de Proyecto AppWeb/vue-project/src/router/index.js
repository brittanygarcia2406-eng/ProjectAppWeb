import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import CatalogView from '../views/CatalogView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import MisCursosView from '../views/MisCursosView.vue'
import StudentCourseDetailView from '../views/StudentCourseDetailView.vue'
import DocenteCourseView from '../views/DocenteCourseView.vue'
import SolicitudesView from '../views/SolicitudesView.vue'
import SolicitudesCourseView from '../views/SolicitudesCourseView.vue'
import GestionCursosView from '../views/GestionCursosView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView, meta: { public: true } },
    { path: '/register', name: 'register', component: RegisterView, meta: { public: true } },
    { path: '/catalogo', name: 'catalogo', component: CatalogView },
    { path: '/catalogo/:id', name: 'catalogo-detalle', component: CourseDetailView },
    {
      path: '/mis-cursos',
      name: 'mis-cursos',
      component: MisCursosView,
      meta: { roles: ['estudiante', 'docente'] },
    },
    {
      path: '/mis-cursos/:id',
      name: 'mis-cursos-detalle',
      component: StudentCourseDetailView,
      meta: { roles: ['estudiante'] },
    },
    {
      path: '/mis-cursos/:id/gestion',
      name: 'mis-cursos-gestion',
      component: DocenteCourseView,
      meta: { roles: ['docente'] },
    },
    {
      path: '/solicitudes',
      name: 'solicitudes',
      component: SolicitudesView,
      meta: { roles: ['admin'] },
    },
    {
      path: '/solicitudes/:courseId',
      name: 'solicitudes-curso',
      component: SolicitudesCourseView,
      meta: { roles: ['admin'] },
    },
    {
      path: '/gestion-cursos',
      name: 'gestion-cursos',
      component: GestionCursosView,
      meta: { roles: ['admin'] },
    },
    { path: '/dashboard', redirect: '/catalogo' },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.public && authStore.isAuthenticated && to.path !== '/register') {
    return '/catalogo'
  }

  if (!to.meta.public && !authStore.isAuthenticated) {
    return '/'
  }

  if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
    return '/catalogo'
  }

  return true
})

export default router

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import CourseCard from '../components/catalog/CourseCard.vue'
import { useAuthStore } from '../stores/auth'
import { useCoursesStore } from '../stores/courses'
import { useEnrollmentsStore } from '../stores/enrollments'

const router = useRouter()
const authStore = useAuthStore()
const coursesStore = useCoursesStore()
const enrollmentsStore = useEnrollmentsStore()

const pageTitle = computed(() =>
  authStore.userRole === 'docente' ? 'Mis Cursos Asignados' : 'Mis Cursos Inscritos',
)

const myCourses = computed(() => {
  if (authStore.userRole === 'estudiante') {
    const ids = enrollmentsStore.acceptedCoursesForStudent(authStore.userEmail)
    return coursesStore.coursesByIds(ids)
  }

  if (authStore.userRole === 'docente') {
    return coursesStore.coursesForTeacher(authStore.teacherName)
  }

  return []
})

const openCourse = (courseId) => {
  if (authStore.userRole === 'docente') {
    router.push(`/mis-cursos/${courseId}/gestion`)
  } else {
    router.push(`/mis-cursos/${courseId}`)
  }
}
</script>

<template>
  <AppLayout>
    <div class="page-content">
      <h1 class="page-title">{{ pageTitle }}</h1>

      <div v-if="myCourses.length" class="course-grid">
        <div v-for="course in myCourses" :key="course.id" class="my-course-item">
          <CourseCard :course="course" link-base="/mis-cursos" />
          <button type="button" class="btn-primary btn-sm btn-block" @click="openCourse(course.id)">
            {{ authStore.userRole === 'docente' ? 'Gestionar curso' : 'Ver progreso' }}
          </button>
        </div>
      </div>

      <div v-else class="empty-state">
        <p v-if="authStore.userRole === 'estudiante'">
          Aún no tienes cursos inscritos. Solicita inscripción desde el catálogo.
        </p>
        <p v-else>No tienes cursos asignados por el administrador.</p>
      </div>
    </div>
  </AppLayout>
</template>

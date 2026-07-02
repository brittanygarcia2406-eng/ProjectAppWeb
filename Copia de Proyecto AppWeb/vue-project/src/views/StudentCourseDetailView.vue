<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import CourseCurriculumStudent from '../components/courses/CourseCurriculumStudent.vue'
import { useCoursesStore } from '../stores/courses'
import { useAuthStore } from '../stores/auth'
import { useEnrollmentsStore } from '../stores/enrollments'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()
const authStore = useAuthStore()
const enrollmentsStore = useEnrollmentsStore()

const course = computed(() => coursesStore.getCourseById(route.params.id))

const isEnrolled = computed(() => {
  return enrollmentsStore.acceptedCoursesForStudent(authStore.userEmail).includes(
    Number(route.params.id),
  )
})

const goBack = () => router.push('/mis-cursos')
</script>

<template>
  <AppLayout>
    <div v-if="course && isEnrolled" class="page-content">
      <button type="button" class="btn-back" @click="goBack">← Volver a Mis Cursos</button>

      <div class="page-card">
        <h1>{{ course.title }}</h1>
        <CourseCurriculumStudent :student-email="authStore.userEmail" />
      </div>
    </div>

    <div v-else class="page-content">
      <div class="page-card">
        <h1>Acceso no permitido</h1>
        <p>No estás inscrito en este curso o el curso no existe.</p>
        <button type="button" class="btn-primary" @click="goBack">Volver</button>
      </div>
    </div>
  </AppLayout>
</template>

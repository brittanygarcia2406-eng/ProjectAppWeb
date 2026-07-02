<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useCoursesStore } from '../stores/courses'
import { useAuthStore } from '../stores/auth'
import { useEnrollmentsStore } from '../stores/enrollments'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()
const authStore = useAuthStore()
const enrollmentsStore = useEnrollmentsStore()

const course = computed(() => coursesStore.getCourseById(route.params.id))

const levelLabels = {
  intermedio: 'Intermedio',
  principiante: 'Principiante',
  avanzado: 'Avanzado',
}

const enrollmentStatus = computed(() => {
  if (authStore.userRole !== 'estudiante') return null
  return enrollmentsStore.requestStatusForStudent(authStore.userEmail, Number(route.params.id))
})

const canRequest = computed(() => {
  return (
    authStore.userRole === 'estudiante' &&
    !enrollmentStatus.value &&
    course.value?.availableSeats > 0
  )
})

const requestEnrollment = () => {
  const result = enrollmentsStore.requestEnrollment({
    courseId: Number(route.params.id),
    studentEmail: authStore.userEmail,
    studentName: authStore.userName,
  })
  alert(result.message)
}

const goBack = () => router.push('/catalogo')
</script>

<template>
  <AppLayout>
    <div v-if="course" class="page-content">
      <button type="button" class="btn-back" @click="goBack">← Volver al catálogo</button>

      <div class="detail-card">
        <img :src="course.image" :alt="course.title" class="detail-image" />
        <div class="detail-body">
          <div class="course-card-meta">
            <span class="level-badge" :class="`level-badge--${course.level}`">
              {{ levelLabels[course.level] }}
            </span>
            <span class="course-category">{{ course.category }}</span>
          </div>

          <h1>{{ course.title }}</h1>
          <p class="detail-description">{{ course.description }}</p>
          <div v-if="course.synopsis" class="detail-synopsis">
            <h2>Sinopsis</h2>
            <p>{{ course.synopsis }}</p>
          </div>

          <div class="detail-info-grid">
            <div><strong>Nivel:</strong> {{ levelLabels[course.level] }}</div>
            <div><strong>Categoría:</strong> {{ course.category }}</div>
            <div><strong>Duración:</strong> {{ course.hours }} horas</div>
            <div><strong>Docente:</strong> {{ course.instructor }}</div>
            <div><strong>Cupos disponibles:</strong> {{ course.availableSeats }} / {{ course.totalSeats }}</div>
            <div><strong>Semanas:</strong> {{ course.weeks.length }}</div>
          </div>

          <div v-if="authStore.userRole === 'estudiante'" class="detail-actions">
            <button v-if="canRequest" type="button" class="btn-primary" @click="requestEnrollment">
              Solicitar inscripción
            </button>
            <p v-else-if="enrollmentStatus === 'pending'" class="course-status pending">
              Tu solicitud está pendiente de revisión.
            </p>
            <p v-else-if="enrollmentStatus === 'accepted'" class="course-status accepted">
              Ya estás inscrito. Revisa el curso en Mis Cursos.
            </p>
            <p v-else-if="enrollmentStatus === 'rejected'" class="course-status rejected">
              Tu solicitud fue rechazada.
            </p>
            <p v-else-if="course.availableSeats <= 0" class="course-status rejected">
              No hay cupos disponibles.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="page-content">
      <div class="page-card">
        <h1>Curso no encontrado</h1>
        <button type="button" class="btn-primary" @click="goBack">Volver</button>
      </div>
    </div>
  </AppLayout>
</template>

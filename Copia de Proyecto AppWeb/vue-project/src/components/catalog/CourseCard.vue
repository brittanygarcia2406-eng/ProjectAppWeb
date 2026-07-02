<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useEnrollmentsStore } from '../../stores/enrollments'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  linkBase: {
    type: String,
    default: '/catalogo',
  },
})

const route = useRoute()
const authStore = useAuthStore()
const enrollmentsStore = useEnrollmentsStore()

const levelLabels = {
  intermedio: 'Intermedio',
  principiante: 'Principiante',
  avanzado: 'Avanzado',
}

const detailLink = computed(() => `${props.linkBase}/${props.course.id}`)

const enrollmentStatus = computed(() => {
  if (authStore.userRole !== 'estudiante') return null
  return enrollmentsStore.requestStatusForStudent(authStore.userEmail, props.course.id)
})

const canRequest = computed(() => {
  return (
    authStore.userRole === 'estudiante' &&
    !enrollmentStatus.value &&
    props.course.availableSeats > 0
  )
})

const requestEnrollment = () => {
  const result = enrollmentsStore.requestEnrollment({
    courseId: props.course.id,
    studentEmail: authStore.userEmail,
    studentName: authStore.userName,
  })
  alert(result.message)
}
</script>

<template>
  <article class="course-card">
    <router-link :to="detailLink" class="course-card-link">
      <img :src="course.image" :alt="course.title" class="course-card-image" />
      <div class="course-card-body">
        <div class="course-card-meta">
          <span class="level-badge" :class="`level-badge--${course.level}`">
            {{ levelLabels[course.level] }}
          </span>
          <span class="course-category">{{ course.category }}</span>
        </div>
        <h3 class="course-card-title">{{ course.title }}</h3>
        <p class="course-card-description">{{ course.description }}</p>
        <div class="course-card-footer">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {{ course.hours }} horas
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            {{ course.instructor }}
          </span>
        </div>
        <p class="course-seats">Cupos: {{ course.availableSeats }} / {{ course.totalSeats }}</p>
      </div>
    </router-link>

    <div v-if="canRequest && route.path.startsWith('/catalogo')" class="course-card-actions">
      <button type="button" class="btn-primary btn-sm" @click.stop="requestEnrollment">
        Solicitar inscripción
      </button>
    </div>
    <p v-else-if="enrollmentStatus === 'pending'" class="course-status pending">Solicitud pendiente</p>
    <p v-else-if="enrollmentStatus === 'accepted'" class="course-status accepted">Inscrito</p>
    <p v-else-if="enrollmentStatus === 'rejected'" class="course-status rejected">Solicitud rechazada</p>
  </article>
</template>

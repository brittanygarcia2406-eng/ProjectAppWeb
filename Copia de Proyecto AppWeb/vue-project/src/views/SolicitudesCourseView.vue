<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useCoursesStore } from '../stores/courses'
import { useEnrollmentsStore } from '../stores/enrollments'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()
const enrollmentsStore = useEnrollmentsStore()

const course = computed(() => coursesStore.getCourseById(route.params.courseId))

const pendingRequests = computed(() =>
  enrollmentsStore.requests.filter(
    (request) =>
      request.courseId === Number(route.params.courseId) && request.status === 'pending',
  ),
)

const accept = (requestId) => {
  const ok = enrollmentsStore.acceptRequest(requestId)
  alert(ok ? 'Solicitud aceptada.' : 'No se pudo aceptar la solicitud.')
}

const reject = (requestId) => {
  enrollmentsStore.rejectRequest(requestId)
  alert('Solicitud rechazada.')
}

const goBack = () => router.push('/solicitudes')
</script>

<template>
  <AppLayout>
    <div v-if="course" class="page-content">
      <button type="button" class="btn-back" @click="goBack">← Volver a Solicitudes</button>

      <div class="page-card">
        <h1>{{ course.title }}</h1>
        <p class="text-muted">
          Cupos disponibles: {{ course.availableSeats }} / {{ course.totalSeats }}
        </p>

        <div v-if="pendingRequests.length" class="student-request-list">
          <article v-for="request in pendingRequests" :key="request.id" class="student-request-card">
            <div>
              <h3>{{ request.studentName }}</h3>
              <p class="text-muted">{{ request.studentEmail }}</p>
              <p class="text-muted">
                Solicitado: {{ new Date(request.requestedAt).toLocaleString() }}
              </p>
            </div>
            <div class="request-actions">
              <button type="button" class="btn-success" @click="accept(request.id)">
                Aceptar
              </button>
              <button type="button" class="btn-danger" @click="reject(request.id)">
                Rechazar
              </button>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <p>No hay solicitudes pendientes para este curso.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

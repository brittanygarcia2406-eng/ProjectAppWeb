<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useCoursesStore } from '../stores/courses'
import { useEnrollmentsStore } from '../stores/enrollments'

const router = useRouter()
const coursesStore = useCoursesStore()
const enrollmentsStore = useEnrollmentsStore()

const coursesWithRequests = computed(() => {
  const pendingByCourse = enrollmentsStore.pendingByCourse
  return coursesStore.activeCourses
    .filter((course) => pendingByCourse[course.id] > 0)
    .map((course) => ({
      ...course,
      pendingCount: pendingByCourse[course.id],
    }))
})

const openCourse = (courseId) => router.push(`/solicitudes/${courseId}`)
</script>

<template>
  <AppLayout>
    <div class="page-content">
      <h1 class="page-title">Solicitudes de inscripción</h1>

      <div v-if="coursesWithRequests.length" class="request-list">
        <button
          v-for="course in coursesWithRequests"
          :key="course.id"
          type="button"
          class="request-course-card"
          @click="openCourse(course.id)"
        >
          <div>
            <h3>{{ course.title }}</h3>
            <p class="text-muted">{{ course.category }} · {{ course.instructor }}</p>
          </div>
          <span class="request-badge">{{ course.pendingCount }} solicitudes</span>
        </button>
      </div>

      <div v-else class="empty-state">
        <p>No hay solicitudes pendientes por revisar.</p>
      </div>
    </div>
  </AppLayout>
</template>

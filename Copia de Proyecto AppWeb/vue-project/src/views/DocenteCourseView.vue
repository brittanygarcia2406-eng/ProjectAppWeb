<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useCoursesStore } from '../stores/courses'
import { useAuthStore } from '../stores/auth'
import { useEnrollmentsStore } from '../stores/enrollments'
import { formatGrade } from '../utils/grades'

const route = useRoute()
const router = useRouter()
const coursesStore = useCoursesStore()
const authStore = useAuthStore()
const enrollmentsStore = useEnrollmentsStore()

const activeTab = ref('contenido')
const gradeDrafts = ref({})

const course = computed(() => coursesStore.getCourseById(route.params.id))

const isAssigned = computed(() => {
  return course.value?.instructor === authStore.teacherName
})

const participants = computed(() =>
  enrollmentsStore.acceptedStudentsForCourse(Number(route.params.id)),
)

const goBack = () => router.push('/mis-cursos')

const saveWeekTitle = (week) => {
  coursesStore.updateWeek(course.value.id, week.id, { title: week.title })
}

const saveTopic = (week, topic) => {
  coursesStore.updateTopic(course.value.id, week.id, topic.id, {
    title: topic.title,
  })
}

const saveActivity = (week, topic, activity) => {
  coursesStore.updateActivity(course.value.id, week.id, topic.id, activity.id, {
    title: activity.title,
    type: activity.type,
  })
}

const draftKey = (studentEmail, activityId) => `${studentEmail}-${activityId}`

const getDraft = (studentEmail, activityId) => {
  const key = draftKey(studentEmail, activityId)
  if (gradeDrafts.value[key] !== undefined) return gradeDrafts.value[key]
  const current = enrollmentsStore.getGrade(studentEmail, course.value.id, activityId)
  return current ?? ''
}

const setDraft = (studentEmail, activityId, value) => {
  gradeDrafts.value[draftKey(studentEmail, activityId)] = value
}

const saveGrade = (studentEmail, activityId) => {
  const value = getDraft(studentEmail, activityId)
  if (value === '' || value === null) return
  enrollmentsStore.setGrade({
    studentEmail,
    courseId: course.value.id,
    activityId,
    score: value,
  })
  alert('Calificación guardada.')
}
</script>

<template>
  <AppLayout>
    <div v-if="course && isAssigned" class="page-content">
      <button type="button" class="btn-back" @click="goBack">← Volver a Mis Cursos</button>

      <div class="page-card">
        <h1>{{ course.title }}</h1>
        <p class="text-muted">Gestión docente — {{ course.instructor }}</p>

        <div class="tabs">
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeTab === 'contenido' }"
            @click="activeTab = 'contenido'"
          >
            Temas y actividades
          </button>
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeTab === 'participantes' }"
            @click="activeTab = 'participantes'"
          >
            Participantes ({{ participants.length }})
          </button>
        </div>

        <div v-if="activeTab === 'contenido'" class="teacher-content">
          <section v-for="week in course.weeks" :key="week.id" class="week-block editable">
            <label class="field-label">Semana</label>
            <input v-model="week.title" class="field-input" @blur="saveWeekTitle(week)" />

            <div v-for="topic in week.topics" :key="topic.id" class="topic-block editable">
              <label class="field-label">Tema</label>
              <input v-model="topic.title" class="field-input" @blur="saveTopic(week, topic)" />

              <div
                v-for="activity in topic.activities"
                :key="activity.id"
                class="activity-edit-row"
              >
                <input
                  v-model="activity.title"
                  class="field-input"
                  @blur="saveActivity(week, topic, activity)"
                />
                <select
                  v-model="activity.type"
                  class="field-select"
                  @change="saveActivity(week, topic, activity)"
                >
                  <option value="cuestionario">Cuestionario</option>
                  <option value="lectura">Lectura</option>
                  <option value="informe">Informe</option>
                  <option value="práctica">Práctica</option>
                  <option value="proyecto">Proyecto</option>
                  <option value="examen">Examen</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div v-else class="teacher-participants">
          <p v-if="!participants.length" class="empty-state">No hay estudiantes inscritos aún.</p>

          <div v-for="student in participants" :key="student.id" class="participant-card">
            <h3>{{ student.studentName }}</h3>
            <p class="text-muted">{{ student.studentEmail }}</p>

            <div
              v-for="week in course.weeks"
              :key="`student-${student.id}-week-${week.id}`"
              class="grading-week"
            >
              <h4>{{ week.title }}</h4>
              <div v-for="topic in week.topics" :key="topic.id" class="grading-topic">
                <p><strong>{{ topic.title }}</strong></p>
                <div
                  v-for="activity in topic.activities"
                  :key="activity.id"
                  class="grading-row"
                >
                  <span>{{ activity.title }} ({{ activity.type }})</span>
                  <div class="grading-inputs">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      class="field-input grade-input"
                      :value="getDraft(student.studentEmail, activity.id)"
                      @input="setDraft(student.studentEmail, activity.id, $event.target.value)"
                    />
                    <button
                      type="button"
                      class="btn-primary btn-sm"
                      @click="saveGrade(student.studentEmail, activity.id)"
                    >
                      Guardar
                    </button>
                    <span class="grade-value">
                      {{ formatGrade(enrollmentsStore.getGrade(student.studentEmail, course.id, activity.id)) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="page-content">
      <div class="page-card">
        <h1>Acceso no permitido</h1>
        <button type="button" class="btn-primary" @click="goBack">Volver</button>
      </div>
    </div>
  </AppLayout>
</template>

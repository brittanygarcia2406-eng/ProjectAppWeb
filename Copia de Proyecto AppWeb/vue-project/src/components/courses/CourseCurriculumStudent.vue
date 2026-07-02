<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '../../stores/courses'
import { useEnrollmentsStore } from '../../stores/enrollments'
import { getTopicAverage, getCourseAverage, formatGrade } from '../../utils/grades'

const props = defineProps({
  studentEmail: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const coursesStore = useCoursesStore()
const enrollmentsStore = useEnrollmentsStore()

const course = computed(() => coursesStore.getCourseById(route.params.id))

const courseAverage = computed(() => {
  if (!course.value) return null
  return getCourseAverage(enrollmentsStore.grades, props.studentEmail, course.value)
})

const getActivityGrade = (activityId) => {
  return enrollmentsStore.getGrade(props.studentEmail, Number(route.params.id), activityId)
}

const topicAverage = (topic) => {
  return getTopicAverage(
    enrollmentsStore.grades,
    props.studentEmail,
    Number(route.params.id),
    topic,
  )
}
</script>

<template>
  <div v-if="course" class="curriculum">
    <div class="curriculum-summary">
      <p><strong>Docente:</strong> {{ course.instructor }}</p>
      <p><strong>Duración:</strong> {{ course.hours }} horas ({{ course.weeks.length }} semanas)</p>
      <div v-if="course.synopsis" class="course-synopsis">
        <p><strong>Sinopsis:</strong></p>
        <p>{{ course.synopsis }}</p>
      </div>
      <p class="course-final-grade">
        <strong>Nota promedio del curso:</strong>
        <span class="grade-value">{{ formatGrade(courseAverage) }}</span>
      </p>
    </div>

    <section v-for="week in course.weeks" :key="week.id" class="week-block">
      <h3>{{ week.title }}</h3>

      <div v-for="topic in week.topics" :key="topic.id" class="topic-block">
        <div class="topic-header">
          <h4>{{ topic.title }}</h4>
          <span class="topic-average">
            Promedio del tema: {{ formatGrade(topicAverage(topic)) }}
          </span>
        </div>

        <div class="activities-table">
          <div class="activities-row activities-header">
            <span>Actividad</span>
            <span>Tipo</span>
            <span>Calificación</span>
          </div>
          <div
            v-for="activity in topic.activities"
            :key="activity.id"
            class="activities-row"
          >
            <span>{{ activity.title }}</span>
            <span class="activity-type">{{ activity.type }}</span>
            <span class="grade-value">{{ formatGrade(getActivityGrade(activity.id)) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCoursesStore } from '../../stores/courses'
import CourseCard from './CourseCard.vue'

const coursesStore = useCoursesStore()
const courses = computed(() => coursesStore.filteredCourses)
</script>

<template>
  <section class="catalog-content">
    <div v-if="courses.length" class="course-grid">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>
    <div v-else class="empty-state">
      <p>No se encontraron cursos con los filtros seleccionados.</p>
    </div>
  </section>
</template>

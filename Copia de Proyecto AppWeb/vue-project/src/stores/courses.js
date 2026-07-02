import { defineStore } from 'pinia'
import { createInitialCourses } from '../data/teachers'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    categories: [
      'Todos',
      'Desarrollo Web',
      'Data Science',
      'Diseño',
      'Marketing',
      'Gestión',
      'Seguridad',
    ],
    courses: createInitialCourses(),
    searchQuery: '',
    activeCategory: 'Todos',
  }),
  getters: {
    activeCourses: (state) => state.courses.filter((course) => course.active),

    filteredCourses: (state) => {
      return state.courses
        .filter((course) => course.active)
        .filter((course) => {
          const matchesCategory =
            state.activeCategory === 'Todos' || course.category === state.activeCategory
          const query = state.searchQuery.toLowerCase().trim()
          const matchesSearch =
            !query ||
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            (course.synopsis?.toLowerCase().includes(query) ?? false) ||
            course.instructor.toLowerCase().includes(query)
          return matchesCategory && matchesSearch
        })
    },

    coursesByIds: (state) => (ids) => state.courses.filter((course) => ids.includes(course.id)),

    coursesForTeacher: (state) => (teacherName) =>
      state.courses.filter((course) => course.active && course.instructor === teacherName),
  },
  actions: {
    getCourseById(id) {
      return this.courses.find((course) => course.id === Number(id))
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setActiveCategory(category) {
      this.activeCategory = category
    },

    decreaseSeat(courseId) {
      const course = this.getCourseById(courseId)
      if (course && course.availableSeats > 0) {
        course.availableSeats -= 1
      }
    },

    updateCourse(courseId, updates) {
      const course = this.getCourseById(courseId)
      if (!course) return false

      Object.assign(course, updates)
      return true
    },

    assignTeacher(courseId, instructor) {
      return this.updateCourse(courseId, { instructor })
    },

    deleteCourse(courseId) {
      const course = this.getCourseById(courseId)
      if (!course) return false
      course.active = false
      return true
    },

    updateWeek(courseId, weekId, weekData) {
      const course = this.getCourseById(courseId)
      if (!course) return false
      const index = course.weeks.findIndex((week) => week.id === weekId)
      if (index === -1) return false
      course.weeks[index] = { ...course.weeks[index], ...weekData }
      return true
    },

    updateTopic(courseId, weekId, topicId, topicData) {
      const course = this.getCourseById(courseId)
      if (!course) return false
      const week = course.weeks.find((item) => item.id === weekId)
      if (!week) return false
      const index = week.topics.findIndex((topic) => topic.id === topicId)
      if (index === -1) return false
      week.topics[index] = { ...week.topics[index], ...topicData }
      return true
    },

    updateActivity(courseId, weekId, topicId, activityId, activityData) {
      const course = this.getCourseById(courseId)
      if (!course) return false
      const week = course.weeks.find((item) => item.id === weekId)
      const topic = week?.topics.find((item) => item.id === topicId)
      if (!topic) return false
      const index = topic.activities.findIndex((activity) => activity.id === activityId)
      if (index === -1) return false
      topic.activities[index] = { ...topic.activities[index], ...activityData }
      return true
    },
  },
})

import { defineStore } from 'pinia'
import { useCoursesStore } from './courses'
import { gradeKey } from '../utils/grades'

let nextRequestId = 1

export const useEnrollmentsStore = defineStore('enrollments', {
  state: () => ({
    requests: [],
    grades: {},
  }),
  getters: {
    pendingRequests: (state) => state.requests.filter((request) => request.status === 'pending'),

    pendingByCourse: (state) => {
      const grouped = {}
      state.requests
        .filter((request) => request.status === 'pending')
        .forEach((request) => {
          grouped[request.courseId] = (grouped[request.courseId] || 0) + 1
        })
      return grouped
    },

    acceptedCoursesForStudent: (state) => (studentEmail) => {
      const courseIds = state.requests
        .filter(
          (request) => request.studentEmail === studentEmail && request.status === 'accepted',
        )
        .map((request) => request.courseId)
      return [...new Set(courseIds)]
    },

    requestStatusForStudent: (state) => (studentEmail, courseId) => {
      const request = state.requests.find(
        (item) => item.studentEmail === studentEmail && item.courseId === courseId,
      )
      return request?.status ?? null
    },

    acceptedStudentsForCourse: (state) => (courseId) => {
      return state.requests.filter(
        (request) => request.courseId === courseId && request.status === 'accepted',
      )
    },
  },
  actions: {
    requestEnrollment({ courseId, studentEmail, studentName }) {
      const coursesStore = useCoursesStore()
      const course = coursesStore.getCourseById(courseId)

      if (!course || !course.active) {
        return { success: false, message: 'El curso no está disponible.' }
      }

      if (course.availableSeats <= 0) {
        return { success: false, message: 'No hay cupos disponibles.' }
      }

      const existing = this.requests.find(
        (request) =>
          request.studentEmail === studentEmail &&
          request.courseId === courseId &&
          ['pending', 'accepted'].includes(request.status),
      )

      if (existing) {
        const message =
          existing.status === 'pending'
            ? 'Ya tienes una solicitud pendiente para este curso.'
            : 'Ya estás inscrito en este curso.'
        return { success: false, message }
      }

      this.requests.push({
        id: nextRequestId++,
        courseId,
        studentEmail,
        studentName,
        status: 'pending',
        requestedAt: new Date().toISOString(),
      })

      return { success: true, message: 'Solicitud enviada correctamente.' }
    },

    acceptRequest(requestId) {
      const request = this.requests.find((item) => item.id === requestId)
      if (!request || request.status !== 'pending') return false

      const coursesStore = useCoursesStore()
      const course = coursesStore.getCourseById(request.courseId)
      if (!course || course.availableSeats <= 0) return false

      request.status = 'accepted'
      request.resolvedAt = new Date().toISOString()
      coursesStore.decreaseSeat(request.courseId)
      return true
    },

    rejectRequest(requestId) {
      const request = this.requests.find((item) => item.id === requestId)
      if (!request || request.status !== 'pending') return false

      request.status = 'rejected'
      request.resolvedAt = new Date().toISOString()
      return true
    },

    setGrade({ studentEmail, courseId, activityId, score }) {
      const normalized = Math.min(10, Math.max(0, Number(score)))
      this.grades[gradeKey(studentEmail, courseId, activityId)] = normalized
    },

    getGrade(studentEmail, courseId, activityId) {
      const value = this.grades[gradeKey(studentEmail, courseId, activityId)]
      return value === undefined ? null : value
    },
  },
})

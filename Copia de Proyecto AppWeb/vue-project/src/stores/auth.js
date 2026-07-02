import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userRole: null,
    userName: '',
    userEmail: '',
    teacherName: '',
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.userRole),
    roleLabel: (state) => {
      const labels = {
        estudiante: 'Estudiante',
        docente: 'Docente',
        admin: 'Admin',
      }
      return labels[state.userRole] ?? ''
    },
  },
  actions: {
    setUser(role, email) {
      this.userRole = role
      this.userEmail = email

      const names = {
        estudiante: 'Estudiante Demo',
        docente: 'Docente Demo',
        admin: 'Admin',
      }

      this.userName = names[role] ?? email
      this.teacherName = role === 'docente' ? 'María González' : ''
    },
    logout() {
      this.userRole = null
      this.userName = ''
      this.userEmail = ''
      this.teacherName = ''
    },
  },
})

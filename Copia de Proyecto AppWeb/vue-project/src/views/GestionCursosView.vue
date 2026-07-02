<script setup>
import { ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import { useCoursesStore } from '../stores/courses'
import { TEACHERS } from '../data/teachers'

const coursesStore = useCoursesStore()
const teachers = TEACHERS
const editingId = ref(null)
const editForm = ref({
  title: '',
  description: '',
  synopsis: '',
  hours: 0,
  instructor: '',
  category: '',
  level: 'intermedio',
})

const startEdit = (course) => {
  editingId.value = course.id
  editForm.value = {
    title: course.title,
    description: course.description,
    synopsis: course.synopsis ?? '',
    hours: course.hours,
    instructor: course.instructor,
    category: course.category,
    level: course.level,
  }
}

const saveEdit = () => {
  coursesStore.updateCourse(editingId.value, { ...editForm.value })
  editingId.value = null
  alert('Curso actualizado.')
}

const cancelEdit = () => {
  editingId.value = null
}

const deleteCourse = (courseId) => {
  if (confirm('¿Eliminar este curso del catálogo vigente?')) {
    coursesStore.deleteCourse(courseId)
    alert('Curso eliminado del catálogo.')
  }
}

const assignTeacher = (courseId, instructor) => {
  coursesStore.assignTeacher(courseId, instructor)
  alert(`Docente asignado: ${instructor}`)
}
</script>

<template>
  <AppLayout>
    <div class="page-content">
      <h1 class="page-title">Gestión de Cursos</h1>
      <p class="text-muted page-subtitle">
        Edita información, asigna docentes o elimina cursos que ya no estén vigentes.
      </p>

      <div class="admin-course-list">
        <article v-for="course in coursesStore.activeCourses" :key="course.id" class="admin-course-card">
          <div v-if="editingId !== course.id">
            <h3>{{ course.title }}</h3>
            <p class="text-muted">{{ course.description }}</p>
            <p v-if="course.synopsis" class="text-muted course-synopsis-preview">{{ course.synopsis }}</p>
            <div class="detail-info-grid compact">
              <div><strong>Categoría:</strong> {{ course.category }}</div>
              <div><strong>Nivel:</strong> {{ course.level }}</div>
              <div><strong>Horas:</strong> {{ course.hours }}</div>
              <div><strong>Docente:</strong> {{ course.instructor }}</div>
              <div><strong>Cupos:</strong> {{ course.availableSeats }}/{{ course.totalSeats }}</div>
            </div>

            <div class="admin-actions">
              <label class="assign-teacher">
                Asignar docente:
                <select
                  :value="course.instructor"
                  class="field-select"
                  @change="assignTeacher(course.id, $event.target.value)"
                >
                  <option v-for="teacher in teachers" :key="teacher" :value="teacher">
                    {{ teacher }}
                  </option>
                </select>
              </label>
              <button type="button" class="btn-secondary btn-sm" @click="startEdit(course)">
                Editar
              </button>
              <button type="button" class="btn-danger btn-sm" @click="deleteCourse(course.id)">
                Eliminar
              </button>
            </div>
          </div>

          <div v-else class="edit-form">
            <label class="field-label">Título</label>
            <input v-model="editForm.title" class="field-input" />

            <label class="field-label">Descripción</label>
            <textarea v-model="editForm.description" class="field-textarea" rows="3" />

            <label class="field-label">Sinopsis</label>
            <textarea v-model="editForm.synopsis" class="field-textarea" rows="4" />

            <div class="edit-grid">
              <div>
                <label class="field-label">Horas</label>
                <input v-model.number="editForm.hours" type="number" class="field-input" />
              </div>
              <div>
                <label class="field-label">Categoría</label>
                <input v-model="editForm.category" class="field-input" />
              </div>
              <div>
                <label class="field-label">Nivel</label>
                <select v-model="editForm.level" class="field-select">
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
              <div>
                <label class="field-label">Docente</label>
                <select v-model="editForm.instructor" class="field-select">
                  <option v-for="teacher in teachers" :key="teacher" :value="teacher">
                    {{ teacher }}
                  </option>
                </select>
              </div>
            </div>

            <div class="admin-actions">
              <button type="button" class="btn-primary btn-sm" @click="saveEdit">Guardar</button>
              <button type="button" class="btn-secondary btn-sm" @click="cancelEdit">Cancelar</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </AppLayout>
</template>

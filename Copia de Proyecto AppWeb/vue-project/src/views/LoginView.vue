<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthValidation } from '../composables/useAuthValidation'
import { useAuthStore } from '../stores/auth'
import RegisterView from '../views/RegisterView.vue'

const registerView = ref(RegisterView)
const email = ref('')
const password = ref('')
const { validateLogin } = useAuthValidation()
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = () => {
  const result = validateLogin(email.value, password.value)
  if (result.success) {
    authStore.setUser(result.role, email.value)
    router.push('/catalogo')
  } else {
    alert(result.message)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <h1>Bienvenido</h1>
        <p class="login-subtitle">Inicia sesión para continuar con tus cursos</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input id="email" v-model="email" type="email" placeholder="tu@email.com" />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input id="password" v-model="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>
      </form>

      <!--<p>
        ¿No tienes cuenta? 
        <router-link to="/register">
        Regístrate
      </router-link>
      </p> -->

      <div class="account-types">
        <p class="account-types-title">Tipos de cuenta:</p>
        <ul>
          <li><strong>Estudiante:</strong> correo@ejemplo.edu</li>
          <li><strong>Docente:</strong> correo@ejemplo.doc</li>
          <li><strong>Administrador:</strong> correo@ejemplo.admin</li>
        </ul>
      </div>
    </div>
  </div>
</template>

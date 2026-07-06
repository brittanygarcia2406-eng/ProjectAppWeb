 <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  email: '',
  password: ''
});

const register = () => {
  // Validación estricta: Solo dominios .edu
  if (!form.value.email.endsWith('.edu')) {
    alert('Registro denegado: Este formulario es exclusivo para estudiantes (.edu).');
    return;
  }

  // Validación de longitud de contraseña (3 dígitos exactos)
  if (form.value.password.length !== 3) {
    alert('La contraseña debe tener exactamente 3 dígitos.');
    return;
  }

  // Lógica de registro aquí (ej: llamar a una API)
  console.log('Estudiante registrado:', form.value.email);
  
  // Redirección al login tras éxito
  router.push('/');
};
</script>

<template>
  <div class="register-wrapper">
    <form @submit.prevent="register" class="auth-card">
      <h2>Registro de Estudiante</h2>
      
      <div class="input-group">
        <label>Correo Electrónico (.edu)</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="nombre@universidad.edu" 
          required 
        />
      </div>

      <div class="input-group">
        <label>Contraseña</label>
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="***" 
          maxlength="3" 
          required 
        />
      </div>

      <button type="submit" class="btn-primary">Registrarse</button>
      
      <p class="footer-link">
        ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fe;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.input-group { margin-bottom: 1rem; }
.input-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.input-group input { 
  width: 100%; 
  padding: 12px; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  box-sizing: border-box;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #5a32fa; /* Violeta institucional del prototipo */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>

<script setup>
import { ref } from 'vue';

// Estado reactivo (sin tipado)
const mensaje = ref('¡Hola! Proyecto en JavaScript puro.');
const contador = ref(0);

const incrementar = () => {
  contador.value++;
};
</script>

<template>
  <div class="contenedor">
    <h1>{{ mensaje }}</h1>
    <button @click="incrementar">Clics: {{ contador }}</button>
  </div>
</template>

<style scoped>
.contenedor {
  padding: 1.5rem;
  background: #f4f4f4;
  border-radius: 8px;
}
</style>
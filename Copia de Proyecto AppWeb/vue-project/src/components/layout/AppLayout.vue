<script setup>
import AppNavbar from './AppNavbar.vue'
</script>

<template>
  <div class="app-layout">
    <AppNavbar />
    <main>
      <slot />
    </main>
    <button type="button" class="help-fab" aria-label="Ayuda">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </button>
  </div>
</template>

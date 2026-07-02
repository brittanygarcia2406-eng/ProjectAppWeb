<script setup>
import { useCoursesStore } from '../../stores/courses'

const coursesStore = useCoursesStore()
</script>

<template>
  <div class="catalog-toolbar">
    <div class="toolbar-inner">
      <div class="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          :value="coursesStore.searchQuery"
          type="search"
          placeholder="Buscar cursos..."
          @input="coursesStore.setSearchQuery($event.target.value)"
        />
      </div>
      <div class="filter-buttons">
        <button
          v-for="category in coursesStore.categories"
          :key="category"
          type="button"
          class="filter-btn"
          :class="{ active: coursesStore.activeCategory === category }"
          @click="coursesStore.setActiveCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>

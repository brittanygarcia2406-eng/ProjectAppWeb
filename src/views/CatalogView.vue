<script setup>
import AppLayout from '../components/layout/AppLayout.vue'
import CatalogHero from '../components/catalog/CatalogHero.vue'
import CourseFilters from '../components/catalog/CourseFilters.vue'
import CourseGrid from '../components/catalog/CourseGrid.vue'
</script>

<template>
  <AppLayout>
    <CatalogHero />
    <CourseFilters />
    <CourseGrid />
  </AppLayout>
</template>

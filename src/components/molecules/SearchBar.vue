<script setup>
import SearchIcon from '../atoms/SearchIcon.vue'
import { ref } from 'vue'

// State management for the search input
const searchQuery = ref('')
</script>

<template>
  <div
    class="flex items-center bg-white border border-red-600 rounded-lg p-2 w-96 max-w-sm shadow-md"
  >
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Ne arıyorsunuz?"
      class="flex-grow focus:outline-none text-sm text-gray-700 placeholder-gray-400"
    />

    <SearchIcon class="ml-2" />
  </div>
</template>

<style scoped>
/* Tailwind utility classes are generally better, but we remove the browser's default focus ring here */
input:focus {
  outline: none;
  box-shadow: none;
}
</style>

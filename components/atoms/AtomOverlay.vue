<script setup lang="ts">
defineProps<{ show: boolean }>();
</script>

<template>
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    @click="$emit('close')"
  ></div>
</template>
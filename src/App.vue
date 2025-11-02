<template>
  <div>
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '@/components/organisms/TheHeader.vue'
import TheFooter from '@/components/organisms/TheFooter.vue'
</script>

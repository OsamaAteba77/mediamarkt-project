<script setup>
import AppLogo from '@/components/atoms/AppLogo.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
</script>

<template>
  <header class="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between gap-4">
    <AppLogo />
    <SearchBar />
    <nav class="flex items-center gap-3">
      <a href="#" class="text-sm hover:underline">Login</a>
      <a href="#" class="text-sm hover:underline">Cart</a>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>

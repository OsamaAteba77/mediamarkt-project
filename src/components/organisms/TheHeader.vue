<script setup>
import AppLogo from '@/components/atoms/AppLogo.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
</script>

<template>
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <AppLogo />

      <!-- center: search -->
      <div class="flex-1">
        <SearchBar />
      </div>

      <!-- right: actions -->
      <nav class="flex items-center gap-5">
        <router-link to="/login" class="text-sm hover:underline">Login</router-link>
        <router-link to="/cart" class="text-sm hover:underline">Cart</router-link>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.router-link-active {
  font-weight: 600;
  text-decoration: underline;
}
</style>

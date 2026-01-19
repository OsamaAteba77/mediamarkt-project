
<script setup lang="ts">
// 1. FETCH DATA FROM SERVER API (SSR)
const { data: homeData, error } = await useFetch('/api/home');
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20"> 
    
    <div v-if="error" class="p-10 text-center text-red-600">
      <h2 class="text-2xl font-bold">Bir hata oluştu</h2>
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="homeData">
      <OrganismHomeHero :slides="homeData.HomeHero" />

      <div class="container max-w-[1400px] mx-auto px-4">
        <OrganismProductCarousel title="Çok Satanlar" :products="homeData.bestSellers" />
      </div>
    </div>

    <div v-else class="p-20 text-center text-gray-400">
      Yükleniyor...
    </div>

  </div>
</template>
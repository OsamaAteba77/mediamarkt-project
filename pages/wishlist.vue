<script setup lang="ts">
import { ref } from 'vue';

// Mock Data for Visual Purposes
const wishlistItems = ref([
  { 
    id: '1', 
    title: 'Apple iPhone 15 128GB', 
    price: 58499, 
    image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_107659528?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02', 
    url: '/product/1' 
  },
  { 
    id: '2', 
    title: 'Dyson V15 Detect Absolute', 
    price: 29999, 
    image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_103323055?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02', 
    url: '/product/2' 
  }
]);

// Function to remove (simulation)
const removeFromWishlist = (id: string) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== id);
};
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-sans text-[#191919] pb-20 pt-6">
    <div class="container max-w-[1200px] mx-auto px-4">
      
      <h1 class="text-2xl font-bold mb-6">Favorilerim</h1>

      <div v-if="wishlistItems.length === 0" class="bg-white rounded-lg p-12 text-center border border-gray-200 shadow-sm">
        <div class="text-6xl mb-4 grayscale opacity-30">❤️</div>
        <h2 class="text-xl font-bold mb-2">Favori listeniz şu an boş.</h2>
        <p class="text-gray-500 mb-8">Beğendiğiniz ürünleri kalp ikonuna tıklayarak buraya ekleyebilirsiniz.</p>
        <NuxtLink to="/" class="inline-block bg-[#df0000] text-white px-8 py-3 rounded font-bold hover:bg-[#c00000] transition-colors">
          Alışverişe Başla
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in wishlistItems" :key="item.id" class="bg-white border border-gray-200 rounded-xl p-4 relative group hover:shadow-md transition-shadow">
          
          <button @click="removeFromWishlist(item.id)" class="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm text-gray-400 hover:text-[#df0000] hover:bg-gray-50 transition-colors" title="Listeden Çıkar">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>

          <div class="aspect-square flex items-center justify-center mb-4 p-4">
            <img :src="item.image" class="max-h-full max-w-full object-contain" />
          </div>

          <h3 class="font-bold text-sm mb-2 line-clamp-2 h-10">{{ item.title }}</h3>
          <div class="font-black text-xl mb-4 text-[#df0000]">{{ item.price.toLocaleString('tr-TR') }} TL</div>

          <button class="w-full border border-gray-300 font-bold text-sm py-3 rounded-md hover:border-black hover:bg-black hover:text-white transition-colors">
            Sepete Ekle
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
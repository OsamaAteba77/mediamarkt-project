 <script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const productId = route.params.id;
const cartStore = useCartStore();

// 1. Fetch Data
const { data: product, error, pending } = await useFetch(`/api/product/${productId}`);
const { data: homeData } = await useFetch('/api/home');

// Gallery State
const activeImage = ref('');

// Initialize active image
watchEffect(() => {
  if (product.value?.images?.length && !activeImage.value) {
    activeImage.value = product.value.images[0];
  }
});

function setImage(url: string) {
  activeImage.value = url;
}

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value);
    // Optional: Show a toast notification here
  }
}

// Calculate dates for "Tahmini teslimat" (Tomorrow - Day after tomorrow)
const deliveryDateStart = new Date();
deliveryDateStart.setDate(deliveryDateStart.getDate() + 1);
const deliveryDateEnd = new Date();
deliveryDateEnd.setDate(deliveryDateEnd.getDate() + 2);
const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
const dateStr = `${deliveryDateStart.toLocaleDateString('tr-TR', dateOptions)} - ${deliveryDateEnd.toLocaleDateString('tr-TR', dateOptions)}`;

</script>

<template>
  <div class="min-h-screen bg-white pb-32 pt-4 font-sans text-[#191919]">
    
    <div v-if="pending" class="text-center p-20">Yükleniyor...</div>
    <div v-else-if="error" class="text-center p-20 text-red-600">Ürün bulunamadı</div>

    <div v-else-if="product" class="container max-w-[1280px] mx-auto px-4">
      
      <div class="text-[11px] text-gray-500 mb-4 flex gap-1 items-center">
        <NuxtLink to="/" class="hover:underline">Anasayfa</NuxtLink> <span>›</span>
        <span>{{ product.category }}</span> <span>›</span>
        <span class="text-gray-900">{{ product.title }}</span>
      </div>

      <h1 class="text-2xl font-bold text-black mb-2 leading-tight">{{ product.title }}</h1>

      <div class="flex items-center gap-3 mb-6 text-xs">
        <div class="flex items-center text-[#df0000]">
          <span v-for="i in 5" :key="i" class="text-sm">
            {{ (product.rating || 0) >= i ? '★' : '☆' }}
          </span>
          <span class="ml-1 text-gray-700 font-bold">{{ product.rating }}</span>
        </div>
        <span class="text-gray-300">|</span>
        <span class="text-gray-500">Ürün Kodu: {{ product.id }}5829</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div class="lg:col-span-7">
          <div class="border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-center h-[450px] bg-white relative">
            <span v-if="product.badge" class="absolute top-4 left-4 bg-[#df0000] text-white text-[10px] font-bold px-2 py-1 rounded">
              {{ product.badge }}
            </span>
            <img :src="activeImage" :alt="product.title" class="w-full h-full object-contain" />
          </div>

          <div class="flex gap-2 overflow-x-auto py-2">
            <button 
              v-for="(img, idx) in product.images" 
              :key="idx" 
              @click="setImage(img)"
              class="w-16 h-16 border rounded p-1 cursor-pointer transition-all hover:border-gray-400"
              :class="activeImage === img ? 'border-black' : 'border-gray-200'"
            >
              <img :src="img" class="w-full h-full object-contain" />
            </button>
          </div>

          <div class="mt-8">
            <h3 class="font-bold text-sm mb-3">Öne Çıkan Özellikler</h3>
            <div class="bg-[#f9f9f9] p-5 rounded-lg border border-gray-100 text-sm">
              <p class="mb-4 text-gray-700">{{ product.description }}</p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <li v-for="(val, key) in product.specs" :key="key" class="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span class="text-gray-600">{{ key }}</span>
                  <span class="font-semibold text-gray-900">{{ val }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="border border-gray-200 rounded-lg p-5 sticky top-4">
            
            <div class="text-right mb-4">
              <div class="text-3xl font-black text-black tracking-tight leading-none">
                {{ product.price.toLocaleString('tr-TR') }},-
              </div>
              <div class="text-[10px] text-gray-500 mt-1">KDV dahil, kargo hariç</div>
            </div>

            <div v-if="product.installment" class="border-t border-gray-100 py-3 flex justify-between items-center text-xs">
              <span class="text-gray-900 font-bold">Taksitli ödeme</span>
              <span class="text-gray-600">{{ product.installment }}</span>
            </div>

            <div v-if="product.clubPoints" class="border-t border-gray-100 py-3 flex items-center gap-2 text-xs">
              <span class="font-bold text-black">MediaMarkt CLUB Puanları</span>
              <span class="bg-gray-100 text-black px-2 py-0.5 rounded font-bold">+{{ product.clubPoints }} P</span>
            </div>

            <div v-if="product.colors" class="py-4 border-t border-gray-100">
              <span class="text-xs font-bold text-black block mb-2">Renk (Üreticiye Göre): Siyah</span>
              <div class="flex gap-2">
                <button 
                  v-for="color in product.colors" :key="color"
                  class="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                  :style="{ backgroundColor: color }"
                />
              </div>
            </div>

            <div class="mt-2 space-y-3 mb-6">
              <div class="flex gap-2">
                <div class="text-green-600 mt-0.5">●</div> <div>
                  <div class="text-sm font-bold text-green-700">Adrese teslimata uygun.</div>
                  <div class="text-xs text-gray-500">Tahmini teslimat {{ dateStr }}</div>
                </div>
                <div class="ml-auto text-xs font-bold text-gray-900">+ 0,-</div>
              </div>

              <div class="flex gap-2">
                <div class="text-[#a05a00] mt-0.5">●</div> <div>
                  <div class="text-sm font-bold text-gray-800">Mağazadan teslim al</div>
                  <div class="text-xs text-gray-500">
                    Lütfen bir mağaza seçin <a href="#" class="font-bold text-black underline">Mağaza seçin</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3 mb-6">
              <button 
                @click="addToCart"
                class="flex-1 bg-[#df0000] hover:bg-[#c00000] text-white font-bold py-3 px-4 rounded-md text-base flex items-center justify-center gap-2 transition-colors"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                Sepete Ekle
              </button>

              <button class="w-12 border border-black rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            <div v-if="product.insurance" class="border-t border-gray-100 pt-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-gray-900">Sigorta Paketleriyle Cihazının Ömrünü Uzat!</span>
                <span class="text-[10px] text-gray-500 underline cursor-pointer">Detaylar</span>
              </div>
              <div class="space-y-2">
                <label v-for="ins in product.insurance" :key="ins.name" class="flex items-center justify-between p-2 border border-gray-200 rounded cursor-pointer hover:border-gray-400">
                  <div class="flex items-center gap-2">
                    <input type="checkbox" class="w-4 h-4 accent-[#df0000]" />
                    <span class="text-xs text-gray-700">{{ ins.name }}</span>
                  </div>
                  <span class="text-xs font-bold text-black">+{{ ins.price }} TL</span>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div v-if="homeData && homeData.bestSellers" class="mt-16 border-t border-gray-200 pt-8">
        <div v-if="product && 'comments' in product && product.comments && product.comments.length > 0" class="mt-16 border-t border-gray-200 pt-8">
        <h3 class="text-xl font-bold mb-6 text-black">Değerlendirmeler ({{ product.reviews }})</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(comment, idx) in product.comments" :key="idx" class="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="flex justify-between items-center mb-2">
              <div class="font-bold text-sm text-gray-900">{{ comment.user }}</div>
              <div class="text-xs text-gray-500">{{ comment.date }}</div>
            </div>
            
            <div class="flex text-[#df0000] text-xs mb-2">
              <span v-for="i in 5" :key="i">{{ comment.rating >= i ? '★' : '☆' }}</span>
            </div>
            
            <p class="text-sm text-gray-700">{{ comment.text }}</p>
          </div>
        </div>
      </div>
        <OrganismsProductCarousel title="Benzer Ürünler" :products="homeData.bestSellers" />
      </div>

    </div>

    <div v-if="product" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-50 flex items-center justify-between shadow-lg">
      <div>
        <div class="text-lg font-black text-black">{{ product.price.toLocaleString('tr-TR') }},- TL</div>
      </div>
      <button @click="addToCart" class="bg-[#df0000] text-white font-bold py-2 px-6 rounded text-sm flex items-center gap-2">
        Sepete Ekle
      </button>
    </div>

  </div>
</template>
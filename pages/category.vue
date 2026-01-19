 <script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();
const router = useRouter();

// 1. Get Category from URL
const categoryName = computed(() => (route.query.menu as string) || 'Tüm Ürünler');

// 2. Fetch Products
// We watch 'categoryName' so it auto-refreshes if you click a different menu link
const { data: products, pending } = await useFetch('/api/products', {
  query: { category: categoryName },
  watch: [categoryName],
  transform: (data) => {
    return data.map((p: any) => ({
      ...p,
      description: p.description || '',
      stock: p.stock || 0
    }));
  }
});

// 3. SMART FILTER LOGIC 🧠

// State for selected filters
const selectedBrands = ref<string[]>([]);
const priceLimit = ref(100000); // Default max price slider position

// A. Auto-Detect Brands from the fetched products
const availableBrands = computed(() => {
  if (!products.value) return [];
  // Get all brands, remove duplicates, sort alphabetically
  const brands = products.value.map(p => p.brand).filter(Boolean);
  return [...new Set(brands)].sort();
});

// B. Calculate Max Price dynamically (for the slider max value)
const maxProductPrice = computed(() => {
  if (!products.value || products.value.length === 0) return 100000;
  return Math.max(...products.value.map(p => p.price));
});

// C. The Master Filter Function
const filteredProducts = computed(() => {
  if (!products.value) return [];

  return products.value.filter(product => {
    // 1. Check Brand (If no brand selected, show all)
    const brandMatch = selectedBrands.value.length === 0 || selectedBrands.value.includes(product.brand);
    
    // 2. Check Price
    const priceMatch = product.price <= priceLimit.value;

    return brandMatch && priceMatch;
  });
});

// Format currency helper
const formatPrice = (price: number) => price.toLocaleString('tr-TR');
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20 pt-4 font-sans text-[#191919]">
    <div class="container max-w-[1400px] mx-auto px-4">
      
      <div class="text-xs text-gray-500 mb-6 flex items-center gap-1">
        <NuxtLink to="/" class="hover:underline">Anasayfa</NuxtLink> 
        <span>></span> 
        <span class="font-bold text-black capitalize">{{ categoryName }}</span>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        
        <aside class="hidden lg:block w-64 shrink-0">
          <div class="bg-white p-5 rounded-xl border border-gray-200 sticky top-4">
            <h3 class="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Filtrele</h3>
            
            <div class="mb-6">
              <h4 class="text-sm font-bold mb-3">Marka</h4>
              <div v-if="availableBrands.length > 0" class="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <label v-for="brand in availableBrands" :key="brand" class="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    :value="brand" 
                    v-model="selectedBrands"
                    class="w-4 h-4 accent-[#df0000] border-gray-300 rounded focus:ring-[#df0000]" 
                  />
                  <span class="text-sm text-gray-700 group-hover:text-black">{{ brand }}</span>
                </label>
              </div>
              <div v-else class="text-xs text-gray-400">Marka bulunamadı</div>
            </div>

            <div>
              <h4 class="text-sm font-bold mb-2">Fiyat Aralığı</h4>
              <div class="flex justify-between text-xs text-gray-500 mb-2">
                <span>0 TL</span>
                <span>{{ formatPrice(priceLimit) }} TL</span>
              </div>
              <input 
                type="range" 
                v-model.number="priceLimit" 
                min="0" 
                :max="maxProductPrice" 
                step="500"
                class="w-full accent-[#df0000] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
          </div>
        </aside>

        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-4 capitalize">{{ categoryName }} ({{ filteredProducts.length }})</h1>
          
          <div v-if="pending" class="text-center p-20 text-gray-500">Yükleniyor...</div>
          
          <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="product in filteredProducts" :key="product.id" class="h-[420px]">
              <MoleculeProductCard :product="product" />
            </div>
          </div>

          <div v-else class="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm">
            <div class="text-4xl mb-4">😕</div>
            <h3 class="text-lg font-bold text-gray-900">Sonuç Bulunamadı</h3>
            <p class="text-gray-500 text-sm mt-2">Seçtiğiniz filtrelere uygun ürün bulunmamaktadır. Filtreleri temizleyip tekrar deneyin.</p>
            <button 
              @click="selectedBrands = []; priceLimit = maxProductPrice" 
              class="mt-6 text-[#df0000] font-bold underline hover:text-black transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom Scrollbar for brand list */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>
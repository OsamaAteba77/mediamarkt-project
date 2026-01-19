<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductsStore } from '~/stores/products';

definePageMeta({ layout: 'admin' });

const productStore = useProductsStore();
const config = useRuntimeConfig(); // Access config to check data source

// Get data from store state
const products = computed(() => productStore.items);
const loading = computed(() => productStore.loading);
const isFirebase = computed(() => config.public.dataSource === 'FIREBASE');

// Use store actions
const handleDelete = async (id: string) => {
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
  await productStore.deleteProduct(id);
};

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Ürün Yönetimi</h1>
        <div class="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
             :class="isFirebase ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-purple-50 text-purple-700 border-purple-200'">
          <span class="w-2 h-2 rounded-full" :class="isFirebase ? 'bg-orange-500' : 'bg-purple-500'"></span>
          DATA SOURCE: {{ config.public.dataSource }}
        </div>
      </div>
      
      <NuxtLink 
        v-if="isFirebase"
        to="/admin/products/create" 
        class="bg-[#df0000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#c00000] transition flex items-center justify-center gap-2 shadow-sm"
      >
        <span>+</span> Yeni Ürün Ekle
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
      <div class="mt-4 text-gray-500">Yükleniyor...</div>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div class="text-4xl mb-4">📦</div>
      <h3 class="text-lg font-bold">Hiç ürün bulunamadı.</h3>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4">Ürün</th>
              <th class="px-6 py-4">Kategori</th>
              <th class="px-6 py-4">Fiyat</th>
              <th class="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded bg-white border border-gray-200 p-1 shrink-0">
                    <img :src="product.image || product.imageUrl" class="h-full w-full object-contain" />
                  </div>
                  <div class="font-bold text-gray-900 line-clamp-1">{{ product.title }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{{ product.category }}</span>
              </td>
              <td class="px-6 py-4 font-bold text-gray-900">{{ product.price?.toLocaleString('tr-TR') }} TL</td>
              
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  
                  <NuxtLink 
                    v-if="isFirebase"
                    :to="`/admin/products/edit/${product.id}`" 
                    class="p-2 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                    title="Düzenle"
                  >
                    ✏️
                  </NuxtLink>
                  <span v-else class="text-xs text-gray-400 mr-2">(Salt Okunur)</span>

                  <button 
                    @click="handleDelete(product.id)" 
                    class="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
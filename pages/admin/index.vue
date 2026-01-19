<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getCountFromServer } from 'firebase/firestore';

definePageMeta({
  layout: 'admin',
  // middleware: 'auth' // We will add this later
});

const { $db } = useNuxtApp();
const stats = ref({
  orders: 0,
  products: 0,
  customers: 0 // Placeholder
});
const loading = ref(true);

onMounted(async () => {
  try {
    // Fetch real counts from Firebase (Efficient way)
    const ordersSnap = await getCountFromServer(collection($db, 'orders'));
    const productsSnap = await getCountFromServer(collection($db, 'products'));
    
    stats.value.orders = ordersSnap.data().count;
    stats.value.products = productsSnap.data().count;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
        <div class="relative z-10">
          <div class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Toplam Sipariş</div>
          <div class="text-4xl font-black text-[#191919]">
            {{ loading ? '-' : stats.orders }}
          </div>
        </div>
        <div class="absolute right-4 bottom-4 text-gray-100 text-6xl">📦</div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
        <div class="relative z-10">
          <div class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Toplam Ürün</div>
          <div class="text-4xl font-black text-[#191919]">
            {{ loading ? '-' : stats.products }}
          </div>
        </div>
        <div class="absolute right-4 bottom-4 text-gray-100 text-6xl">📱</div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
        <div class="relative z-10">
          <div class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Ciro (Tahmini)</div>
          <div class="text-4xl font-black text-[#df0000]">
            {{ loading ? '-' : '₺' + (stats.orders * 15000).toLocaleString() }}
          </div>
        </div>
        <div class="absolute right-4 bottom-4 text-red-50 text-6xl">💰</div>
      </div>

    </div>

    <div class="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      <h2 class="font-bold text-lg mb-2">Yönetici Paneline Hoş Geldiniz</h2>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        Sol menüyü kullanarak ürün ekleyebilir, fiyatları güncelleyebilir veya gelen siparişlerin durumunu değiştirebilirsiniz.
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/admin/products" class="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
          Ürün Yönetimi
        </NuxtLink>
        <NuxtLink to="/admin/orders" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
          Siparişler
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
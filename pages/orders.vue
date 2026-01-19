 <script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useOrdersStore } from '~/stores/orders'; // Import Order Store
import { useAuthStore } from '~/stores/auth';     // Import Auth Store

const router = useRouter();
const ordersStore = useOrdersStore();
const authStore = useAuthStore();

// Use Store State
const orders = computed(() => ordersStore.orders);
const loading = computed(() => ordersStore.loading);
const user = computed(() => authStore.user);

const formatDate = (timestamp: any) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('tr-TR', { 
    day: 'numeric', month: 'long', year: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  }).format(date);
};

const formatPrice = (price: number) => price.toLocaleString('tr-TR');

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};

onMounted(() => {
  // Initialize Auth Listener if not ready
  authStore.initAuth();
});

// Watch for user to load, then fetch orders
watch(user, (newUser) => {
  if (newUser) {
    ordersStore.fetchUserOrders(newUser.uid);
  } else if (!authStore.loading) {
   
  }
}, { immediate: true });
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-sans text-[#191919] pb-20">
    
    <div class="bg-white border-b border-gray-200">
      <div class="container max-w-[1200px] mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold">Siparişlerim</h1>
      </div>
    </div>

    <div class="container max-w-[1200px] mx-auto px-4 py-8">
      
      <div v-if="loading" class="text-center py-20 text-gray-500">
        Yükleniyor...
      </div>

      <div v-else-if="!user" class="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 class="text-xl font-bold mb-2">Giriş Yapmalısınız</h2>
        <p class="text-gray-500 mb-6">Siparişlerinizi görüntülemek için lütfen giriş yapın.</p>
        <NuxtLink to="/login" class="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition-colors">
          Giriş Yap
        </NuxtLink>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="text-4xl mb-4">📦</div>
        <h2 class="text-xl font-bold mb-2">Henüz Siparişiniz Yok</h2>
        <p class="text-gray-500 mb-6">Alışverişe başlayarak ilk siparişinizi oluşturabilirsiniz.</p>
        <NuxtLink to="/" class="text-[#df0000] font-bold underline hover:text-black">
          Alışverişe Başla
        </NuxtLink>
      </div>

      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 text-sm">
            <div class="flex gap-8">
              <div>
                <div class="text-gray-500 text-xs uppercase font-bold">Sipariş Tarihi</div>
                <div class="font-semibold">{{ formatDate(order.createdAt) }}</div>
              </div>
              <div>
                <div class="text-gray-500 text-xs uppercase font-bold">Alıcı</div>
                <div class="font-semibold">{{ order.customerName }}</div>
              </div>
              <div>
                <div class="text-gray-500 text-xs uppercase font-bold">Toplam Tutar</div>
                <div class="font-bold text-[#df0000]">{{ formatPrice(order.totalPrice) }} TL</div>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <div class="text-gray-500 text-xs uppercase font-bold">Sipariş No</div>
              <div class="font-mono text-xs">{{ order.id }}</div>
            </div>
          </div>

          <div class="p-6">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="order.status === 'Hazırlanıyor' ? 'bg-orange-500' : 'bg-green-500'"></span>
              {{ order.status }}
            </h3>

            <div class="space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                <img :src="item.image" class="w-16 h-16 object-contain border rounded p-1" />
                <div class="flex-1">
                  <div class="font-bold text-sm">{{ item.title }}</div>
                  <div class="text-xs text-gray-500">Adet: {{ item.quantity }}</div>
                </div>
                <div class="font-bold text-sm">{{ formatPrice(item.price) }} TL</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
 <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';

definePageMeta({ layout: 'admin' });

const { $db } = useNuxtApp();
const orders = ref<any[]>([]);
const loading = ref(true);

// Status Options
const statusOptions = ['Hazırlanıyor', 'Kargolandı', 'Teslim Edildi', 'İptal Edildi'];

// 1. Fetch All Orders
const fetchOrders = async () => {
  loading.value = true;
  try {
    // Get all orders sorted by date (Newest first)
    const q = query(collection($db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    orders.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};

// 2. Update Order Status
const updateStatus = async (orderId: string, newStatus: string) => {
  try {
    const orderRef = doc($db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus
    });
    alert(`Sipariş durumu "${newStatus}" olarak güncellendi.`);
  } catch (error) {
    console.error("Update error:", error);
    alert('Durum güncellenemedi.');
  }
};

// Helpers
const formatDate = (timestamp: any) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('tr-TR', { 
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
  }).format(date);
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Hazırlanıyor': return 'bg-orange-100 text-orange-700';
    case 'Kargolandı': return 'bg-blue-100 text-blue-700';
    case 'Teslim Edildi': return 'bg-green-100 text-green-700';
    case 'İptal Edildi': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Sipariş Yönetimi</h1>

    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-20 bg-white rounded-xl border border-gray-200">
      <div class="text-4xl mb-4">📦</div>
      <h3 class="text-lg font-bold">Henüz sipariş yok.</h3>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4">Sipariş No</th>
              <th class="px-6 py-4">Müşteri</th>
              <th class="px-6 py-4">Tarih</th>
              <th class="px-6 py-4">Tutar</th>
              <th class="px-6 py-4">Durum</th>
              <th class="px-6 py-4">İşlem</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
              
              <td class="px-6 py-4 font-mono text-xs text-gray-400">
                #{{ order.id.slice(0, 8) }}...
              </td>

              <td class="px-6 py-4">
                <div class="font-bold text-gray-900">{{ order.customerName }}</div>
                <div class="text-xs">{{ order.shippingAddress?.city }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatDate(order.createdAt) }}
              </td>

              <td class="px-6 py-4 font-bold text-[#df0000]">
                {{ order.totalPrice?.toLocaleString('tr-TR') }} TL
              </td>

              <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold" :class="getStatusColor(order.status)">
                  {{ order.status }}
                </span>
              </td>

              <td class="px-6 py-4">
                <select 
                  v-model="order.status" 
                  @change="updateStatus(order.id, order.status)"
                  class="border border-gray-300 rounded text-xs py-1 px-2 focus:border-black outline-none bg-white cursor-pointer"
                >
                  <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
 <script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // 1. Import Firestore

const { $db, $auth } = useNuxtApp(); // 2. Get DB and Auth
const cartStore = useCartStore();
const router = useRouter();

// Redirect if cart is empty
if (cartStore.count === 0) {
  router.push('/');
}

const formatPrice = (price: number) => price.toLocaleString('tr-TR');
const loading = ref(false);

// Form State
const form = ref({
  name: '',
  surname: '',
  phone: '',
  city: '',
  address: '',
  cardName: '',
  cardNumber: '',
  expDate: '',
  cvv: ''
});

// 3. THE REAL ORDER FUNCTION
const completeOrder = async () => {
  // Basic Validation
  if (!form.value.name || !form.value.address || !form.value.city) {
    alert('Lütfen adres bilgilerini doldurunuz.');
    return;
  }

  loading.value = true;

  try {
    const currentUser = $auth.currentUser;

    // A. Prepare the Order Data
    const orderData = {
      userId: currentUser ? currentUser.uid : 'guest', // Save User ID if logged in
      customerName: `${form.value.name} ${form.value.surname}`,
      customerPhone: form.value.phone,
      shippingAddress: {
        city: form.value.city,
        details: form.value.address
      },
      items: cartStore.items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1, // Simple quantity for now
        image: item.imageUrl || item.images // Handle mock vs real data structure
      })),
      totalPrice: cartStore.totalPrice,
      status: 'Hazırlanıyor', // Default status
      createdAt: serverTimestamp() // Database Server Time
    };

    // B. Send to Firebase 'orders' collection
    await addDoc(collection($db, 'orders'), orderData);

    // C. Success Handling
    alert('Siparişiniz başarıyla alındı! Teşekkürler.');
    cartStore.clearCart(); // Empty the cart
    router.push('/'); // Go Home (We will change this to /orders later)

  } catch (error) {
    console.error("Order Error:", error);
    alert('Sipariş oluşturulurken bir hata oluştu.');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] pb-20 pt-6 font-sans text-[#191919]">
    <div class="container max-w-[1280px] mx-auto px-4">
      
      <h1 class="text-2xl font-bold mb-6">Ödeme ve Teslimat</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        
        <div class="flex-1 space-y-6">
          
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
              <span class="bg-[#df0000] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Teslimat Adresi
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Ad</label>
                <input v-model="form.name" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="Adınız" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Soyad</label>
                <input v-model="form.surname" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="Soyadınız" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Telefon</label>
                <input v-model="form.phone" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="05XX XXX XX XX" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Şehir</label>
                <select v-model="form.city" class="w-full border border-gray-300 rounded p-2 text-sm outline-none bg-white">
                  <option value="">Seçiniz</option>
                  <option value="Istanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="Izmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Yalova">Yalova</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">Adres Detayı</label>
                <textarea v-model="form.address" rows="3" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="Mahalle, Sokak, No..."></textarea>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
              <span class="bg-[#df0000] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Ödeme Yöntemi
            </h2>

            <div class="p-4 bg-gray-50 rounded border border-gray-200 mb-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked class="accent-[#df0000]" />
                <span class="font-bold text-sm">Kredi / Banka Kartı</span>
              </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">Kart Üzerindeki İsim</label>
                <input v-model="form.cardName" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">Kart Numarası</label>
                <input v-model="form.cardNumber" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="XXXX XXXX XXXX XXXX" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Son Kullanma Tarihi</label>
                <input v-model="form.expDate" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="AA/YY" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                <input v-model="form.cvv" type="text" class="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#df0000] outline-none" placeholder="123" />
              </div>
            </div>
          </div>

        </div>

        <div class="lg:w-[360px] shrink-0">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 shadow-sm">
            <h3 class="font-bold text-lg mb-4 pb-4 border-b border-gray-100">Sipariş Özeti</h3>
            
            <div class="space-y-3 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3 text-sm">
                <img :src="(Array.isArray(item.images) ? item.images[0] : item.images) || item.imageUrl || '/placeholder.png'" class="w-12 h-12 object-contain border rounded p-1" />
                <div class="flex-1">
                  <div class="line-clamp-2 text-gray-700">{{ item.title }}</div>
                  <div class="font-bold">{{ formatPrice(item.price) }} TL</div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-4 mt-4 space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{{ formatPrice(cartStore.totalPrice) }} TL</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span class="text-green-600 font-bold">Ücretsiz</span>
              </div>
            </div>

            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <span class="font-bold text-lg">Toplam</span>
              <span class="font-black text-2xl text-[#df0000]">{{ formatPrice(cartStore.totalPrice) }} TL</span>
            </div>

            <button 
              @click="completeOrder"
              :disabled="loading"
              class="w-full bg-[#df0000] hover:bg-[#c00000] text-white font-bold py-4 rounded-lg mt-6 text-lg transition-colors shadow-md disabled:opacity-50"
            >
              {{ loading ? 'İşleniyor...' : 'Siparişi Tamamla' }}
            </button>

            <div class="mt-4 text-xs text-gray-400 text-center">
              Mesafeli Satış Sözleşmesi'ni okudum ve onaylıyorum.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
</style>
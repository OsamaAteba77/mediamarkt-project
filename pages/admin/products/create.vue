<script setup lang="ts">
import { ref } from 'vue';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router';

definePageMeta({ layout: 'admin' });

const { $db } = useNuxtApp();
const router = useRouter();
const loading = ref(false);

const form = ref({
  title: '',
  price: 0,
  category: 'Telefon',
  brand: '',
  image: '', // Using URL for simplicity as per requirements
  description: ''
});

const categories = ['Telefon', 'Bilgisayar', 'Beyaz Eşya', 'TV, Görüntü ve Ses', 'Ev Aletleri & Yaşam'];

const handleSubmit = async () => {
  if (!form.value.title || !form.value.price) return alert('Lütfen zorunlu alanları doldurun.');
  
  loading.value = true;
  try {
    await addDoc(collection($db, 'products'), {
      ...form.value,
      createdAt: serverTimestamp(),
      inStock: true,
      rating: 5.0,
      reviewCount: 0
    });
    alert('Ürün başarıyla eklendi!');
    router.push('/admin/products');
  } catch (error) {
    console.error(error);
    alert('Hata oluştu.');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/admin/products" class="text-gray-500 hover:text-black">‹ Geri Dön</NuxtLink>
      <h1 class="text-2xl font-bold">Yeni Ürün Ekle</h1>
    </div>

    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Ürün Adı</label>
          <input v-model="form.title" type="text" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" placeholder="Örn: iPhone 15" required />
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Fiyat (TL)</label>
            <input v-model="form.price" type="number" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Marka</label>
            <input v-model="form.brand" type="text" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" placeholder="Apple, Samsung..." />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
          <select v-model="form.category" class="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-black outline-none">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Resim URL</label>
          <input v-model="form.image" type="text" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" placeholder="https://..." />
          <p class="text-xs text-gray-500 mt-1">Resmin internet üzerindeki bağlantısını yapıştırın.</p>
        </div>

        <div class="pt-4">
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {{ loading ? 'Ekleniyor...' : 'Ürünü Kaydet' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>
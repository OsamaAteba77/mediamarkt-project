<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router';

definePageMeta({ layout: 'admin' });

const { $db } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const saving = ref(false);

// Get the ID from the URL (e.g., 0aWeji0KZkkvy5mC9e4t)
const productId = route.params.id as string;

const form = ref({
  title: '',
  price: 0,
  category: '',
  brand: '',
  image: '',
  description: ''
});

const categories = ['Telefon', 'Bilgisayar', 'Beyaz Eşya', 'TV, Görüntü ve Ses', 'Ev Aletleri & Yaşam'];

// 1. Fetch Existing Data
const fetchProduct = async () => {
  try {
    const docRef = doc($db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      form.value = {
        title: data.title || '',
        price: data.price || 0,
        category: data.category || 'Telefon',
        brand: data.brand || '',
        image: data.image || data.imageUrl || '', // Handles inconsistent naming
        description: data.description || ''
      };
    } else {
      alert('Ürün bulunamadı.');
      router.push('/admin/products');
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
};

// 2. Update Data
const handleUpdate = async () => {
  if (!form.value.title || !form.value.price) return alert('Lütfen zorunlu alanları doldurun.');
  
  saving.value = true;
  try {
    const docRef = doc($db, 'products', productId);
    await updateDoc(docRef, {
      ...form.value
      // We do NOT update 'createdAt' to preserve the original date
    });
    alert('Ürün başarıyla güncellendi!');
    router.push('/admin/products');
  } catch (error) {
    console.error("Update error:", error);
    alert('Güncelleme sırasında hata oluştu.');
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/admin/products" class="text-gray-500 hover:text-black">‹ Geri Dön</NuxtLink>
      <h1 class="text-2xl font-bold">Ürünü Düzenle</h1>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
    </div>

    <div v-else class="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <form @submit.prevent="handleUpdate" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Ürün Adı</label>
          <input v-model="form.title" type="text" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" required />
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Fiyat (TL)</label>
            <input v-model="form.price" type="number" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Marka</label>
            <input v-model="form.brand" type="text" class="w-full border border-gray-300 rounded-lg p-3 focus:border-black outline-none" />
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
          <div class="flex gap-4 items-start">
             <input v-model="form.image" type="text" class="flex-1 border border-gray-300 rounded-lg p-3 focus:border-black outline-none" />
             <div v-if="form.image" class="h-12 w-12 border border-gray-200 rounded p-1 bg-white shrink-0">
               <img :src="form.image" class="h-full w-full object-contain" />
             </div>
          </div>
        </div>

        <div class="pt-4">
          <button 
            type="submit" 
            :disabled="saving"
            class="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {{ saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>
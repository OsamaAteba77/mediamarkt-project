 <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const { $auth } = useNuxtApp();
const router = useRouter();
const user = ref<any>(null);
const loading = ref(false);
const message = ref('');

// Form Data
const form = ref({
  displayName: '',
  email: '',
  phone: ''
});

const handleLogout = async () => {
  await signOut($auth);
  router.push('/');
};

const handleUpdate = async () => {
  if (!user.value) return;
  loading.value = true;
  message.value = '';
  
  try {
    // Update Firebase Profile Name
    await updateProfile(user.value, {
      displayName: form.value.displayName
    });
    message.value = 'Bilgileriniz başarıyla güncellendi.';
  } catch (error) {
    console.error(error);
    message.value = 'Güncelleme sırasında hata oluştu.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onAuthStateChanged($auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      form.value.displayName = currentUser.displayName || '';
      form.value.email = currentUser.email || '';
      form.value.phone = currentUser.phoneNumber || '';
    } else {
      router.push('/login');
    }
  });
});
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-sans text-[#191919] pb-20">
    
    <div class="bg-white border-b border-gray-200">
      <div class="container max-w-[1200px] mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold">Kişisel Bilgilerim</h1>
      </div>
    </div>

    <div class="container max-w-[600px] mx-auto px-4 py-8">
      
      <div class="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        
        <form @submit.prevent="handleUpdate" class="space-y-6">
          
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">Ad Soyad</label>
            <input v-model="form.displayName" type="text" class="w-full h-12 px-4 border border-gray-300 rounded text-sm focus:border-black focus:ring-0 outline-none transition-colors" />
          </div>
          
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">E-Posta</label>
            <input v-model="form.email" type="email" disabled class="w-full h-12 px-4 border border-gray-200 bg-gray-50 rounded text-sm text-gray-500 cursor-not-allowed" />
            <p class="text-[10px] text-gray-400 mt-1">Güvenlik nedeniyle e-posta adresi değiştirilemez.</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">Cep Telefonu</label>
            <input v-model="form.phone" type="text" placeholder="5XX ..." class="w-full h-12 px-4 border border-gray-300 rounded text-sm focus:border-black focus:ring-0 outline-none transition-colors" />
          </div>

          <div v-if="message" class="p-4 rounded text-sm font-bold text-center" :class="message.includes('hata') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'">
            {{ message }}
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-[#df0000] text-white font-bold py-3 rounded hover:bg-[#c00000] transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </div>

        </form>

        <div class="mt-8 pt-8 border-t border-gray-100 text-center">
           <button @click="handleLogout" class="text-sm font-bold text-gray-500 hover:text-black underline">
             Hesaptan Çıkış Yap
           </button>
        </div>

      </div>
    </div>
  </div>
</template>
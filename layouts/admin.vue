<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';

const { $auth } = useNuxtApp();
const router = useRouter();
const isSidebarOpen = ref(true);

const menuItems = [
  { title: 'Dashboard', icon: '📊', link: '/admin' },
  { title: 'Siparişler', icon: '📦', link: '/admin/orders' },
  { title: 'Ürünler', icon: '📱', link: '/admin/products' },
  // { title: 'Kategoriler', icon: '📂', link: '/admin/categories' }, // Optional for now
];

const handleLogout = async () => {
  try {
    await signOut($auth);
    router.push('/login');
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans flex text-[#191919]">
    
    <aside 
      class="bg-[#111] text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 lg:relative"
      :class="isSidebarOpen ? 'w-64' : 'w-20 overflow-hidden'"
    >
      <div class="h-16 flex items-center justify-center border-b border-gray-800 font-bold text-xl tracking-tighter">
        <NuxtLink to="/" title="Müşteri Sitesine Git">
          <span v-if="isSidebarOpen" class="text-[#df0000]">Media</span><span v-if="isSidebarOpen">Admin</span>
          <span v-else class="text-[#df0000]">M</span>
        </NuxtLink>
      </div>

      <nav class="flex-1 py-6 space-y-1">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.link" 
          :to="item.link" 
          class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors border-l-4 border-transparent group"
          active-class="bg-gray-800 border-[#df0000]"
        >
          <span class="text-xl mr-3 group-hover:scale-110 transition-transform">{{ item.icon }}</span>
          <span class="font-medium whitespace-nowrap transition-opacity duration-200" :class="{ 'opacity-0 lg:hidden': !isSidebarOpen && false }">
            <span v-if="isSidebarOpen">{{ item.title }}</span>
          </span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-800 space-y-2">
        <NuxtLink to="/" class="flex items-center w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
          <span class="text-xl mr-3">🏠</span>
          <span v-if="isSidebarOpen" class="text-sm">Siteye Dön</span>
        </NuxtLink>
        <button 
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 text-red-400 hover:text-white hover:bg-red-900/20 rounded transition-colors"
        >
          <span class="text-xl mr-3">🚪</span>
          <span v-if="isSidebarOpen" class="text-sm">Çıkış Yap</span>
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300">
      
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm sticky top-0 z-40">
        <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 rounded hover:bg-gray-100 text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        
        <div class="flex items-center gap-4">
          <div class="text-sm font-bold text-gray-700 hidden sm:block">Yönetici Paneli</div>
          <div class="w-8 h-8 rounded-full bg-[#df0000] text-white flex items-center justify-center font-bold text-xs shadow-md">
            A
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>

    </div>

  </div>
</template>
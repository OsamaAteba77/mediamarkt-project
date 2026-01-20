 <script setup lang="ts">
import { ref, computed } from 'vue';
import type { IProduct } from '~/types';

interface Props {
  title: string;
  products: IProduct[];
}

const props = defineProps<Props>();

// Slider State
const currentIndex = ref(0);
const itemsPerPage = 4;  
const maxIndex = computed(() => Math.max(0, props.products.length - itemsPerPage));

const next = () => { if (currentIndex.value < maxIndex.value) currentIndex.value++; };
const prev = () => { if (currentIndex.value > 0) currentIndex.value--; };
</script>

<template>
  <section class="py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-black">{{ title }}</h2>
      <a href="#" class="text-xs font-bold underline">Tümünü Gör</a>
    </div>

    <div class="overflow-hidden -mx-4 px-4 py-4"> 
      <div 
        class="flex transition-transform duration-500 ease-out gap-4"
        :style="{ transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 1}rem))` }"
      >
        <div 
          v-for="product in products" 
          :key="product.id"
          class="min-w-[calc(25%-12px)] select-none"
        >
          <MoleculeProductCard :product="product" />
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <div class="flex gap-3">
        
        <button 
          @click="prev" 
          :disabled="currentIndex === 0"
          class="w-10 h-10 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 rotate-180">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </button>

        <button 
          @click="next" 
          :disabled="currentIndex >= maxIndex"
          class="w-10 h-10 flex items-center justify-center rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </button>

      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { IProduct } from '~/types';

defineProps<{
  product: IProduct
}>();
</script>

<template>
  <NuxtLink :to="`/product/${product.id}`" class="block h-full">
    <div class="h-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col relative group hover:shadow-lg transition-shadow cursor-pointer">
      
      <div v-if="product.badge" class="absolute top-3 left-3 bg-[#df0000] text-white text-[10px] font-bold px-2 py-1 rounded z-10">
        {{ product.badge }}
      </div>

      <div class="w-full aspect-square flex items-center justify-center mb-4 p-2">
        <img 
          :src="product.imageUrl || (Array.isArray(product.images) ? product.images[0] : product.images)" 
          :alt="product.title" 
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div class="flex flex-col flex-grow">
        <h3 class="text-sm font-bold text-gray-900 line-clamp-2 mb-2 leading-snug min-h-[40px]">
          {{ product.title }}
        </h3>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex text-[#df0000] text-xs">
            <span v-for="i in 5" :key="i">
              {{ (product.rating || 0) >= i ? '★' : '☆' }}
            </span>
          </div>
          <span class="text-xs text-gray-400">({{ product.reviews || 0 }})</span>
        </div>

        <div class="mt-auto">
          <div v-if="product.oldPrice" class="text-xs text-gray-400 line-through">
            {{ product.oldPrice.toLocaleString('tr-TR') }} TL
          </div>
          <div class="text-lg font-black text-[#df0000]">
            {{ product.price.toLocaleString('tr-TR') }} TL
          </div>
        </div>
      </div>

    </div>
  </NuxtLink>
</template>
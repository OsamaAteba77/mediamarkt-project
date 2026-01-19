 <script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

const formatPrice = (price: number) => {
  return price.toLocaleString('tr-TR');
};
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] pb-20 pt-6 font-sans text-[#191919]">
    
    <div class="container max-w-[1280px] mx-auto px-4">
      
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Sepetim <span class="text-gray-500 text-lg font-normal">({{ cartStore.count }} Ürün)</span></h1>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        
        <div class="flex-1">
          
          <div v-if="cartStore.count === 0" class="bg-white rounded-lg p-12 text-center border border-gray-200 shadow-sm">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9ca3af" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900 mb-2">Sepetiniz şu an boş.</h2>
            <NuxtLink to="/" class="inline-block bg-[#df0000] hover:bg-[#c00000] text-white font-bold py-3 px-8 rounded text-sm transition-colors mt-2">
              Alışverişe Başla
            </NuxtLink>
          </div>

          <div v-else class="space-y-4">
            <div v-for="(item, index) in cartStore.items" :key="index" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative group">
              
              <div class="flex flex-col sm:flex-row gap-6 mb-6">
                <div class="w-full sm:w-32 h-32 shrink-0 flex items-center justify-center bg-white p-2">
                  <img :src="item.images?.[0] || item.imageUrl" :alt="item.title" class="w-full h-full object-contain" />
                </div>

                <div class="flex-1">
                  <div class="text-[11px] font-bold text-gray-500 uppercase mb-1">{{ item.brand }}</div>
                  <NuxtLink :to="`/product/${item.id}`" class="text-sm font-bold text-gray-900 hover:text-[#df0000] hover:underline leading-snug block mb-2">
                    {{ item.title }}
                  </NuxtLink>
                  <div class="text-[11px] text-gray-500">Ürün No: {{ item.id }}5923</div>
                  
                  <div class="mt-4 space-y-2">
                    <div class="flex items-center gap-2 text-xs text-green-700">
                      <div class="w-4 h-4 rounded-full border border-green-600 flex items-center justify-center text-[8px] font-bold">✓</div>
                      <div><span class="font-bold">Teslimat: Yarın</span> <span class="text-gray-500 ml-1">Standart teslimat</span></div>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-gray-700">
                      <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[8px] font-bold text-transparent">.</div>
                      <div><span class="font-bold">Mağazadan Teslim Al</span> <span class="text-gray-500 underline cursor-pointer ml-1">Mağaza seç</span></div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-row sm:flex-col justify-between sm:items-end sm:min-w-[140px] mt-4 sm:mt-0">
                  
                  <button @click="cartStore.removeFromCart(item.id)" class="text-gray-400 hover:text-[#df0000] mb-0 sm:mb-4 order-3 sm:order-1 self-start sm:self-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>

                  <div class="text-right order-2 sm:order-2">
                    <div class="text-xl font-black text-black">{{ formatPrice(item.price) }} TL</div>
                    <div class="text-[10px] text-gray-500">KDV Dahil</div>
                  </div>

                  <div class="flex items-center border border-gray-300 rounded bg-white mt-0 sm:mt-4 order-1 sm:order-3 h-8 w-fit">
                    <button @click="cartStore.removeFromCart(item.id)" class="px-2 h-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors rounded-l">
                      -
                    </button>
                    <input type="text" value="1" readonly class="w-8 text-center text-sm font-bold border-none outline-none h-full bg-transparent text-black" />
                    <button @click="cartStore.addToCart(item)" class="px-2 h-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors rounded-r">
                      +
                    </button>
                  </div>

                </div>
              </div>

              <div v-if="item.insurance" class="bg-gray-50 p-4 rounded border border-gray-100 mt-4">
                <div class="font-bold text-xs mb-3 text-gray-800">Cihaz Koruma Sigortası / Uzatılmış Garanti</div>
                <div v-for="(ins, i) in item.insurance" :key="i" class="flex items-center gap-3 mb-2 last:mb-0">
                  <input type="checkbox" :id="`ins-${index}-${i}`" class="w-4 h-4 accent-[#df0000] border-gray-300 rounded cursor-pointer">
                  <label :for="`ins-${index}-${i}`" class="flex-1 text-xs cursor-pointer select-none flex justify-between">
                    <span>{{ ins.name }}</span>
                    <span class="font-bold text-gray-900">+{{ formatPrice(ins.price) }} TL</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div v-if="cartStore.count > 0" class="lg:w-[360px] shrink-0">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 shadow-sm">
            <h3 class="font-bold text-lg mb-4 pb-4 border-b border-gray-100">Sipariş Özeti</h3>
            
            <div class="space-y-2 mb-4 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{{ formatPrice(cartStore.totalPrice) }} TL</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Kargo ücreti</span>
                <span class="text-green-600 font-bold">Ücretsiz</span>
              </div>
            </div>

            <div class="flex justify-between items-end mb-6 pt-4 border-t border-gray-100">
              <span class="font-bold text-gray-900">Toplam Tutar</span>
              <div class="text-right">
                <div class="text-2xl font-black text-[#df0000]">{{ formatPrice(cartStore.totalPrice) }} TL</div>
                <div class="text-[10px] text-gray-500">KDV Dahil</div>
              </div>
            </div>

             <NuxtLink to="/checkout" class="w-full bg-[#df0000] hover:bg-[#c00000] text-white font-bold py-3 rounded text-sm flex items-center justify-center gap-2 transition-colors shadow-md">
  Sepeti Onayla
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
</NuxtLink>

            <div class="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                Güvenli Alışveriş (SSL)
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
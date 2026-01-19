<script setup lang="ts">
import { ref, computed } from 'vue';

 
interface Slide {
  id: number;
  image: string;
  tag: string;
  title: string;
  btnText: string;
}
 
const props = defineProps<{
  slides: Slide[]
}>();

const currentIndex = ref(0);
const itemsPerPage = 3;

// 2. USE PROPS DATA (props.slides)
const maxIndex = computed(() => {
  if (!props.slides || props.slides.length === 0) return 0;
  return Math.max(0, props.slides.length - itemsPerPage);
});

const next = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};

const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};
</script>

<template>
  <section v-if="slides && slides.length > 0" class="container max-w-[1400px] mx-auto px-4 mt-6 relative group">
    
    <div class="overflow-hidden">
      <div 
        class="flex transition-transform duration-500 ease-in-out gap-6"
        :style="{ transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerPage}) - ${currentIndex} * 1.5rem))` }" 
      >
        <div 
          v-for="slide in slides" 
          :key="slide.id"
          class="min-w-[calc(33.333%-1rem)] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full select-none"
        >
          <div class="w-full aspect-[4/3] bg-gray-100 relative">
            <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
          </div>

          <div class="p-6 flex flex-col flex-grow relative">
            <div class="mb-3">
               <span class="border border-[#df0000] text-[#df0000] text-[12px] font-bold px-3 py-1 rounded-full inline-block bg-white">
                 {{ slide.tag }}
               </span>
            </div>

            <h3 class="text-2xl font-black italic text-black mb-8 leading-tight">
              {{ slide.title }}
            </h3>

            <div class="mt-auto flex justify-end">
              <button class="border-2 border-black rounded-lg py-3 px-6 font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all group/btn">
                {{ slide.btnText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-6">
       <div class="flex gap-2">
          <div 
            v-for="(_, idx) in (maxIndex + 1)" 
            :key="idx"
            class="h-1 rounded transition-all duration-300"
            :class="idx === currentIndex ? 'bg-black w-12' : 'bg-gray-300 w-8'"
          ></div>
       </div>

       <div class="flex gap-2">
          <button @click="prev" :disabled="currentIndex === 0" class="w-10 h-10 flex items-center justify-center rounded transition disabled:opacity-30 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-black">
             <span class="text-xl">‹</span>
          </button>
          
          <button @click="next" :disabled="currentIndex >= maxIndex" class="w-10 h-10 flex items-center justify-center rounded transition disabled:opacity-30 disabled:cursor-not-allowed bg-black text-white hover:bg-gray-800">
             <span class="text-xl">›</span>
          </button>
       </div>
    </div>

  </section>
</template>
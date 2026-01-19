<script setup lang="ts">
defineProps<{
  label?: string;
  subLabel?: string;
  count?: number;
}>();
</script>

<template>
  <button class="flex flex-col items-center group relative p-1">
    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center !text-black transition-transform group-hover:scale-105">
      <slot />
      
      <span v-if="count" class="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#df0000]">
        {{ count }}
      </span>
    </div>

    <div v-if="label" class="hidden xl:flex flex-col items-center mt-1 text-white text-[10px] leading-tight">
      <span class="font-bold whitespace-nowrap">{{ label }}</span>
      <span v-if="subLabel" class="text-[9px] opacity-80 whitespace-nowrap">{{ subLabel }}</span>
    </div>
  </button>
</template>
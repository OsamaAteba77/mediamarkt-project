<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'black' | 'outline' | 'ghost' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false
});
</script>

<template>
  <button
    class="rounded font-bold transition-colors duration-200 flex items-center justify-center gap-2"
    :class="{
      'bg-[#df0000] text-white hover:bg-red-700': variant === 'primary',
      'bg-[#191919] text-white hover:bg-black': variant === 'black',
      'border border-gray-300 text-gray-700 hover:border-black': variant === 'outline',
      'bg-transparent text-white hover:underline': variant === 'ghost',
      'bg-gray-300 text-white cursor-not-allowed': variant === 'disabled',
      'px-3 py-1 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
      'w-full': block
    }"
  >
    <slot />
  </button>
</template>
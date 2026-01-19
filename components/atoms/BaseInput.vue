<script setup lang="ts">
interface Props {
  modelValue: string;
  type?: string;
  placeholder?: string;
  variant?: 'search' | 'form';
  icon?: string; 
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="relative w-full">
    <div v-if="icon" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
      <slot name="icon" />
    </div>

    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="w-full outline-none transition-all duration-200"
      :class="{
        'rounded-full py-3 px-4 pl-12 text-gray-700': variant === 'search',
        'rounded border border-gray-300 py-3 px-4 focus:border-gray-900': variant === 'form',
        'pl-10': icon && variant === 'form'
      }"
    />
  </div>
</template>
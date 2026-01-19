<script setup lang="ts">
const query = ref('');

const handleSearch = () => {
  console.log('Searching for:', query.value);
  // Future: Navigate to search results
};
</script>

<template>
  <div class="w-full max-w-[600px]">
    <div class="relative text-gray-500 focus-within:text-gray-900">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BaseIcon name="search" size="w-5 h-5" />
      </div>
      
      <input
        v-model="query"
        type="text"
        placeholder="Ne arıyorsunuz?"
        class="block w-full pl-10 pr-3 py-3 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
        @keyup.enter="handleSearch"
      />
    </div>
  </div>
</template>
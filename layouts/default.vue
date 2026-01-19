<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50">
    <OrganismTheHeader />
    
    <main class="flex-grow container max-w-[1400px] mx-auto px-4 py-8">
      <slot />
    </main>

    <OrganismTheFooter />
  </div>
</template>
<script setup>
import HomeSlider from '@/components/organisms/HomeSlider.vue'
import CampaignCard from '@/components/molecules/CampaignCard.vue'

const campaigns = [
  { title: 'Telefonlarda Büyük İndirim', image: '' },
  { title: 'Laptop Fırsatları', image: '' },
  { title: 'TV Kampanyaları', image: '' },
  { title: 'Kulaklık Sezonu', image: '' },
]
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-8 space-y-12">
    <!-- Slider Section -->
    <section>
      <HomeSlider />
    </section>
    <!-- Home Campaigns Section -->
    <section class="max-w-6xl mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-6">Ana Sayfa Kampanyalar</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CampaignCard
          v-for="(item, index) in campaigns"
          :key="index"
          :title="item.title"
          :image="item.image"
        />
      </div>
    </section>

    <!-- Campaigns Placeholder -->
    <section>
      <h2 class="text-xl font-bold mb-4">Ana Sayfa Kampanyalar</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="n in 4"
          :key="n"
          class="bg-gray-100 h-40 rounded-lg flex items-center justify-center border"
        >
          <p class="text-gray-600">Campaign {{ n }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

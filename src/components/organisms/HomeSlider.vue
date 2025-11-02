<template>
  <div class="w-full max-w-6xl mx-auto py-6">
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 2500 }"
      pagination
      navigation
      class="rounded-lg overflow-hidden"
    >
      <SwiperSlide v-for="(img, index) in slides" :key="index">
        <img
          :src="img"
          alt="Campaign slide"
          class="w-full h-64 object-cover"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

const slides = [
  "https://picsum.photos/1000/400?random=1",
  "https://picsum.photos/1000/400?random=2",
  "https://picsum.photos/1000/400?random=3",
]
</script>

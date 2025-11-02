<template>
  <div
    class="bg-gray-100 border rounded-xl flex flex-col items-center justify-center text-gray-700 hover:shadow-md transition p-6 cursor-pointer"
  >
    <img
      :src="imgSrc"
      @error="useFallback"
      alt="Campaign Image"
      class="w-32 h-32 object-contain mb-3"
      loading="lazy"
    />
    <h3 class="text-center font-semibold">{{ title }}</h3>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  image: { type: String, default: '' },
})

// Data-URI SVG placeholder (no network required)
function svgPlaceholder(text = 'Campaign') {
  const t = encodeURIComponent(text)
  return (
    `data:image/svg+xml;utf8,` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>` +
    `<rect width='100%' height='100%' fill='%23f3f4f6'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'>${t}</text>` +
    `</svg>`
  )
}

const imgSrc = ref(props.image || svgPlaceholder(props.title))

watch(
  () => props.image,
  (v) => {
    imgSrc.value = v || svgPlaceholder(props.title)
  },
)

function useFallback() {
  imgSrc.value = svgPlaceholder(props.title)
}
</script>

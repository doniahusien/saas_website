<template>
  <div v-if="sliders?.length" class="w-full min-h-screen relative">
    <Swiper
      :modules="[Navigation,Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :navigation="{ prevEl: prevEl, nextEl: nextEl }"
      pagination
      class="w-full overflow-hidden"
    >
      <SwiperSlide
        v-for="item in sliders"
        :key="item.id"
        class="relative"
      >
        <NuxtImg
          :src="item.image"
          alt="slider"
          class="w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black/40"></div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-10"
        >
          <div
            v-html="item.title"
            class="font-allura text-2xl md:text-7xl font-bold !text-white"
          ></div>
          <div
            v-html="item.desc"
            class="mt-4 text-sm md:text-base w-full md:w-1/3 !text-white"
          ></div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="absolute -bottom-22 right-22 flex gap-3 z-20">
      <button
        ref="prevEl"
        class="bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        ref="nextEl"
        class="bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

  <p v-else class="text-center py-10 text-gray-400">No sliders available</p>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ref } from 'vue'

const prevEl = ref(null)
const nextEl = ref(null)

defineProps({
  sliders: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
button {
  backdrop-filter: blur(6px);
}
</style>

<template>
  <div v-if="sliders?.length" class="w-full">
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      pagination
      navigation
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

        <div class="absolute inset-0 !bg-black/40"></div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center !text-white p-6 z-10"
        >
          <div
            v-html="item.title"
            class="!text-white font-allura text-2xl md:text-7xl font-bold"
          ></div>
          <div
            v-html="item.desc"
            class="mt-4 text-sm md:text-base w-full md:w-1/3 !text-white"
          ></div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <p v-else class="text-center py-10 text-gray-400">No sliders available</p>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps({
  sliders: {
    type: Array,
    required: true
  }
})
</script>

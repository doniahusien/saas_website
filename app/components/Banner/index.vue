<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => ({
      image: '/images/food1.png',
      title: 'offers.title',
      subtitle: 'offers.subtitle'
    })
  }
})
</script>

<template>
  <div
    class="relative h-60 bg-cover bg-center bg-no-repeat flex items-center"
    :style="{ backgroundImage: `url(${bannerData.image})` }"
  >
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="container relative mx-auto z-10">
      <div class="flex flex-col justify-center items-center gap-4 md:gap-8 text-white">
        <h1 class="font-allura text-3xl md:text-6xl lg:text-7xl font-bold mt-3">
          {{ t(bannerData.title) }}
        </h1>

        <p class="text-silver-gray text-base md:text-xl mt-4">
          {{ t(bannerData.subtitle) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => ({
      image: "/images/food1.png",
      title: "offers.title",
    }),
  },
});
</script>

<template>
  <div
    class="relative h-60 bg-cover bg-center bg-no-repeat flex items-center"
    :style="{ backgroundImage: `url(${bannerData.image})` }"
  >
    <div class="overlay"></div>

    <div class="container relative mx-auto z-10">
      <div
        class="flex flex-col justify-center items-center gap-3 md:gap-5 text-white text-center"
      >
        <h1 class="font-allura text-3xl md:text-6xl lg:text-7xl font-bold mt-3">
          {{ t(bannerData.title) }}
        </h1>
        <UIBreadcrumb />
      </div>
    </div>
  </div>
</template>

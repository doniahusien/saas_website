<template>
  <div class="container mx-auto px-6 md:px-0">
    <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="relative"
        :class="{
          'col-span-1 lg:col-span-2': index === 1,
          'col-span-1 lg:col-span-3': index === 3,
        }"
      >
        <NuxtImg
          :src="img"
          alt="Instagram photo"
          class="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg"
        />
      </div>
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          class="bg-primary text-white text-center rounded-full size-32 flex flex-col items-center justify-center font-medium text-sm md:text-base shadow-lg pointer-events-auto cursor-pointer hover:bg-blue-700 transition"
        >
          <NuxtLink
            to="https://www.instagram.com"
            class="size-full flex flex-col items-center justify-center"
          >
            <span>{{ $t("TITLES.follow") }}</span>
            <span class="font-semibold"> {{ $t("TITLES.instagram") }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const images = [
  "/images/food1.png",
  "/images/food2.png",
  "/images/food3.png",
  "/images/food4.png",
  "/images/food5.png",
];
</script>

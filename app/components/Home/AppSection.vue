<template>
  <section class="container mx-auto px-6 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
  
        <div class="w-140 ms-auto order-1 md:order-2">
          <NuxtImg
            :src="appData.image"
            alt="bg-story"
            class="object-cover size-full shadow-md"
          />
        </div>

      <div class="space-y-8 mt-10 md:mt-0 order-2 md:order-1">
        <div
          class="text-3xl md:text-4xl lg:text-6xl font-bold"
          v-html="appData.title"
        ></div>

        <div v-html="appData.desc" class="text-base md:text-lg text-subtitle"></div>

        <div class="flex gap-4">
          <NuxtLink :to="appData.google_play">
            <NuxtImg
              src="/images/bg/google-play-badge.png"
              alt="Get it on Google Play"
              class="h-8 md:h-12 w-auto"
            />
          </NuxtLink>

          <NuxtLink :to="appData.app_store">
            <NuxtImg
              src="/images/bg/app-store-badge.png"
              alt="Download on the App Store"
              class="h-8 md:h-12 w-auto"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
defineProps({
  appData: Object,
});
</script>

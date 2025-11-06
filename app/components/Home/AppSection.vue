<template>
  <section class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div class="flex justify-center order-1 md:order-2">
        <div
          class="relative w-full md:w-4/5 lg:w-3/4 aspect-4/5 rounded-full overflow-hidden shadow-md bg-[url('/images/bg/bg_app.jpg')] bg-cover bg-center flex items-center justify-center"
        >
          <NuxtImg
            src="/images/bg/app.png"
            alt="App mockup"
            class="w-3/4 md:w-2/3 lg:w-1/2"
          />
        </div>
      </div>
      <div class="space-y-8 mt-10 md:mt-0 order-2 md:order-1">
        <div
          class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          v-html="appData.title"
        ></div>

        <div v-html="appData.desc" class="text-base md:text-lg text-subtitle max-w-lg">
         
        </div>

        <div class="flex gap-4">
          <NuxtLink :to="appData.google_play">
            <NuxtImg
              src="/images/bg/google-play-badge.png"
              alt="Get it on Google Play"
              class="h-10 md:h-12 w-auto"
            />
          </NuxtLink>

          <NuxtLink :to="appData.app_store">
            <NuxtImg
              src="/images/bg/app-store-badge.png"
              alt="Download on the App Store"
              class="h-10 md:h-12 w-auto"
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
  appData: Object
})
</script>

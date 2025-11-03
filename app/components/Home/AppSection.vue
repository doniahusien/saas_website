<template>
  <div class="container mx-auto py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div class="space-y-8 px-6 md:px-10 order-2 md:order-1">
        <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold leading-snug">
          {{ t('app.appTitle') }}<br />
          {{ t('app.appSubtitle') }}
        </h2>

        <p class="text-subtitle max-w-lg">
          {{ t('app.appDescription') }}
        </p>

        <div class="flex gap-4">
          <NuxtLink to="#">
            <NuxtImg
              src="/images/bg/google-play-badge.png"
              alt="Get it on Google Play"
              class="h-10 md:h-12 w-auto"
            />
          </NuxtLink>

          <NuxtLink to="#">
            <NuxtImg
              src="/images/bg/app-store-badge.png"
              alt="Download on the App Store"
              class="h-10 md:h-12 w-auto"
            />
          </NuxtLink>
        </div>
      </div>

     
      <div
        class="relative aspect-[5/7] overflow-hidden bg-[url('/images/bg/bg_app.jpg')] bg-cover bg-center rounded-full mx-auto flex items-center justify-center order-1 md:order-2"
      >
        <NuxtImg
          src="/images/bg/app.png"
          alt="App mockup"
          class="w-3/4 md:w-[50%] "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
</script>

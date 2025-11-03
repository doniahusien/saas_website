<template>
  <div class="container mx-auto space-y-10">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center ">
      <div class="aspect-[5/7] mx-auto">
        <NuxtImg
          src="/images/bg/auth_bg.png"
          alt="bg-story"
          class="object-cover w-full h-full rounded-full"
        />
      </div>

      <div class="space-y-8 mt-8 md:mt-0 px-10">
        <div class="flex items-center space-x-4">
          <span class="text-btn">
            {{ $t("ourStory.eyebrow") }}
          </span>
          <div class="flex-1 h-px bg-btn"></div>
        </div>

        <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold">{{ $t("ourStory.title") }}</h2>
        <p class="text-subtitle">{{ $t("ourStory.paragraph1") }}</p>
        <p class="text-subtitle">{{ $t("ourStory.paragraph2") }}</p>

        <NuxtLink
          to="/"
          class="rounded-full font-medium cursor-pointer px-6 py-3 text-btn border border-btn"
        >
          {{ $t("ourStory.cta") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
</script>

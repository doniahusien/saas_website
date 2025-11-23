<template>
  <section class="container mx-auto px-6 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div class="flex justify-center">
        <div class="w-full md:w-4/5 lg:w-3/4 aspect-4/5">
          <NuxtImg
            :src="about.image"
            alt="bg-story"
            class="object-cover size-full rounded-full shadow-md"
          />
        </div>
      </div>

      <div class="space-y-8 mt-10 md:mt-0">
        <div class="flex items-center gap-4">
          <span class="text-btn font-medium">{{ $t("ourStory.eyebrow") }}</span>
          <div class="flex-1 h-px bg-btn"></div>
        </div>

        <div
          class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          v-html="about.title"
        ></div>

        <div v-html="about.desc" class="space-y-4 text-base md:text-lg text-subtitle">
         
        </div>
        <NuxtLink
          to="/about"
          class="rounded-full font-medium px-8 py-3 border border-btn text-btn hover:bg-btn hover:text-white transition"
        >
          {{ $t("ourStory.cta") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
defineProps({
  about: Object,
})
</script>

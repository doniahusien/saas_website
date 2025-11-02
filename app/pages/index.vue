<template>
  <div class="space-y-20">
    <HomeSlider :sliders="sliderData" />
    <MenuSection/>
    <OurStorySection/>
  </div>
</template>

<script setup lang="ts">

const { data } = await useAsyncData('home', () =>
  useGlobalFetch<any>('home?type=app')
)

const sliderData = computed(() => {
  const slidersBlock = data.value?.data?.find(
    (section: any) => section.type === 'sliders'
  )
  return slidersBlock?.content || []
})
</script>

<template>
  <div class="space-y-34 pb-16">
    <HomeSlider :sliders="sliders" />
    <MenuSection/>
    <HomeOurStorySection/>
    <PopularSection/>
    <HomeReservation/>
    <HomeAppSection/>
    <HomeInstagramGallery/>
    <HomeOffersSection/>
    <HomeSubcribeSection v-if="subscriptionContent && Object.keys(subscriptionContent).length > 0"
     :subscriptionContent="subscriptionContent"/>
  </div>
</template>

<script setup lang="ts">

const { data } = await useAsyncData('HomeData', () =>
  useGlobalFetch<any>('home', {
    headers: { os: 'web' }
  })
)

const sliders = computed(() => data.value?.data?.sliders);
const webContent = computed(() => data.value?.data?.web_content || null)
const popularProducts = computed(() => data.value?.data?.popular_products || [])
const offers = computed(() => data.value?.data?.offers || [])
const subscriptionContent = computed(() => data.value?.data?.subscription_content || null)
const webContentLink = computed(() => data.value?.data?.web_content_link || null)
</script>

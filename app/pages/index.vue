<template>
  <div class="space-y-34 pb-16">
    <HomeSlider :sliders="sliders" />
    <MenuSection/>
    <HomeOurStorySection v-if="webContent && Object.keys(webContent).length > 0" :about="webContent"/>
    <PopularSection v-if="popularProducts && popularProducts.length > 0" :products="popularProducts"/>
    <HomeReservation/>
    <HomeAppSection v-if="webContentLink && Object.keys(webContentLink).length > 0"
     :appData="webContentLink"/>
    <HomeInstagramGallery/>
    <HomeOffersSection v-if="offers && offers.length > 0" :offers="offers"/>
    <HomeSubcribeSection v-if="subscriptionContent && Object.keys(subscriptionContent).length > 0"
     :subscriptionContent="subscriptionContent"/>
  </div>
</template>
<script setup lang="ts">
const branchCookie = useCookie('selectedBranch', { sameSite: 'lax' }) 
const storeId = computed(() => branchCookie.value?.id || null);

const { data, refresh } = await useAsyncData('HomeData', () =>
  useGlobalFetch<any>('home', {
    headers: { os: 'web' },
    params: storeId.value ? { store_id: storeId.value } : {},
  })
)

watch(storeId, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    await refresh()
  }
})

const sliders = computed(() => data.value?.data?.sliders)
const webContent = computed(() => data.value?.data?.web_content || null)
const popularProducts = computed(() => data.value?.data?.popular_products || [])
const offers = computed(() => data.value?.data?.offers || [])
const subscriptionContent = computed(() => data.value?.data?.subscription_content || null)
const webContentLink = computed(() => data.value?.data?.web_content_link || null)
</script>

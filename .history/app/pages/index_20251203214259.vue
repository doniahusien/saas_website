<template>
  <UILoader v-if="pending" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="data">
    <div class="space-y-34 mb-16">
      <HomeSlider :sliders="data.sliders" />
      <MenuSection :products="data.products" />
      <HomeOurStorySection :about="data.web_content" />
      <PopularSection :products="data.popular_products" />
      <HomeReservation />
      <HomeAppSection :appData="data.web_content_link" />
      <HomeInstagramGallery />
      <HomeOffersSection :offers="data.offers" />
      <HomeSubcribeSection :subscriptionContent="data.subscription_content" />
    </div>
  </template>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || null);
const { $api } = useNuxtApp();

const { data, pending, error, refresh } = await useAsyncData<HomeData>(
  'home-data',
  async () => {
    const response = await $api.get<ApiResponse<HomeData>>("home");
    return response.data.data;
  },
  {
    server: false, // Fetch on client side since it depends on cookies
    default: () => null,
    watch: [locale]
  }
);
</script>

<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success' && res">
    <div class="space-y-34 mb-16">
      <HomeSlider :sliders="res.sliders" />
      <MenuSection :products="res.products" />
      <HomeOurStorySection :about="res.web_content" />
      <PopularSection :products="res.popular_products" />
      <HomeReservation />
      <HomeAppSection :appData="res.web_content_link" />
      <HomeInstagramGallery />
      <HomeOffersSection :offers="res.offers" />
      <HomeSubcribeSection :subscriptionContent="res.subscription_content" />
    </div>
  </template>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || null);
const { $api } = useNuxtApp();

const { data, refresh, status, error } = await useAsyncData<ApiResponse<HomeData>>(
  "HomeData",
  () => $api.get("home"),
  {
    watch: [locale],
  }
);
const res = computed(() => data.value?.data.data);
</script>

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

const res = ref<HomeData | null>(null);
const status = ref<"pending" | "success" | "error">("pending");
const error = ref<any>(null);

const fetchHomeData = async () => {
  try {
    status.value = "pending";
    const response = await $api.get<ApiResponse<HomeData>>("home");
    res.value = response.data.data;
    status.value = "success";
  } catch (err: any) {
    console.error(err);
    error.value = err;
    status.value = "error";
  }
};

onMounted(() => fetchHomeData());
watch(locale, () => fetchHomeData());
</script>

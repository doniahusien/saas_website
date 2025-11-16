<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'">
    <div class="space-y-34 pb-16">
      <HomeSlider :sliders="sliders" />
      <MenuSection
        v-if="menuProducts && menuProducts.length > 0"
        :products="menuProducts"
      />
      <HomeOurStorySection
        v-if="webContent && Object.keys(webContent).length > 0"
        :about="webContent"
      />
      <PopularSection
        v-if="popularProducts && popularProducts.length > 0"
        :products="popularProducts"
      />
      <HomeReservation />
      <HomeAppSection
        v-if="webContentLink && Object.keys(webContentLink).length > 0"
        :appData="webContentLink"
      />
      <HomeInstagramGallery />
      <HomeOffersSection v-if="offers && offers.length > 0" :offers="offers" />
      <HomeSubcribeSection
        v-if="subscriptionContent && Object.keys(subscriptionContent).length > 0"
        :subscriptionContent="subscriptionContent"
      />
    </div>
  </template>
</template>
<script setup lang="ts">
const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || null);

const { data, refresh,status,error } = await useAsyncData<ApiResponse<HomeData>>(
  () => `HomeData`,
  () =>
    useGlobalFetch<ApiResponse<HomeData>>("home", {
      headers: {
        os: "web",
        Authorization: `Bearer ${useCookie("jwt_token_saas").value}`,
      },
      params: storeId.value ? { store_id: storeId.value } : {},
    }),
  {
    watch: [storeId],
    deep: true,
  }
);

const sliders = computed<Slider[]>(() => data.value?.data?.sliders ?? []);
const webContent = computed<WebContent | {}>(() => data.value?.data?.web_content ?? {});
const popularProducts = computed<Product[]>(
  () => data.value?.data?.popular_products ?? []
);
const menuProducts = computed<Product[]>(() => data.value?.data?.products ?? []);
const offers = computed<Product[]>(() => data.value?.data?.offers ?? []);
const subscriptionContent = computed<SubscriptionContent | {}>(
  () => data.value?.data?.subscription_content ?? {}
);
const webContentLink = computed<WebContentLink | {}>(
  () => data.value?.data?.web_content_link ?? {}
);
</script>

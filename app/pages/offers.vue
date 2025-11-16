<script setup lang="ts">
const { t } = useI18n();

const branchCookie = useCookie("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || null);

const paginationMeta = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 10,
});

const page = ref(paginationMeta.value.current_page);
const { data: offersData, status, error, refresh } = useAsyncData(
  "offersData",
  () =>
    useGlobalFetch("offers", {
      params: {
        store_id: storeId.value,
        page: page.value,
      },
    }),
  {
    watch: [page],
  }
);

const offers = computed(() => offersData.value?.data || []);

watch(
  () => offersData.value?.meta,
  (meta) => {
    if (meta) paginationMeta.value = meta;
  }
);

function updatePage(newPage: number) {
  page.value = newPage;
}
useDynamicMeta({
  title: t("Offers.title"),
});
</script>


<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'">
    <div class="space-y-20 pb-10">
      <Banner
        :bannerData="{ image: '/images/food1.png', title: 'Offers' }"
      />

      <OffersSection
        :offers="offers"
        :paginationMeta="paginationMeta"
        @updatePage="updatePage"
      />
    </div>
  </template>
</template>

<script setup>
const { t } = useI18n();

const branchCookie = useCookie('selectedBranch', { sameSite: 'lax' });
const storeId = computed(() => branchCookie.value?.id || null);

const offers = ref([]);
const paginationMeta = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 10,
});

async function fetchOffers(page = 1) {
  const { data } = await useAsyncData('offersData', () =>
    useGlobalFetch('offers', {
      params: {
        store_id: storeId.value,
        page, 
      },
    })
  );

  offers.value = data.value.data;
  paginationMeta.value = data.value.meta;
}

fetchOffers(paginationMeta.value.current_page);

watch(() => paginationMeta.value.current_page, (newPage) => {
  fetchOffers(newPage);
});

function updatePage(page) {
  paginationMeta.value.current_page = page;
}

</script>

<template>
  <div class="space-y-20 pb-10">
    <Banner
      :bannerData="{
        image: '/images/food1.png',
        title: 'Offers'
      }"
    />

    <OffersSection 
      :offers="offers"
      :paginationMeta="paginationMeta"
      @updatePage="updatePage"
    />
  </div>
</template>

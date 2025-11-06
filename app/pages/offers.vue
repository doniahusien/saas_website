<script setup>
const { t } = useI18n();

const branchCookie = useCookie('selectedBranch', { sameSite: 'lax' }) 
const storeId = computed(() => branchCookie.value?.id || null);
const { data } = await useAsyncData('offersData', () =>
  useGlobalFetch<any>('offers', {
    params: storeId.value ? { store_id: storeId.value } : {},
  })
)

</script>

<template>
  <div class="space-y-20 pb-10">
    <Banner
      :bannerData="{
        image: '/images/food1.png',
        title: 'Offers',
      }"
    />
    <OffersSection :offers="data?.data" />
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n();

const branchCookie = useCookie('selectedBranch');
const storeId = computed(() => branchCookie.value?.id || 13);

const { data, pending, error } = await useAsyncData('productsData', () =>
  useGlobalFetch<any>('product', {
    headers: { os: 'web' },
    params: { store_id: storeId.value },
  })
);

const itemsPerPage = 6;
const currentPage = ref(1);
const selectedTab = ref('all');

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Drinks', value: 'drinks' },
];

const filteredItems = computed(() => {
  if (!data.value?.data) return [];
  if (selectedTab.value === 'all') return data.value.data;
  return data.value.data.filter((item: any) =>
    item.name.toLowerCase().includes(selectedTab.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});
</script>

<template>
  <div class="space-y-20 pb-10">
    <Banner
      :bannerData="{ image: '/images/food1.png', title: t('TITLES.menu') }"
    />

    <div class="container mx-auto px-2">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-16">
        <UIFilterSection class="lg:col-span-1" />

        <section class="space-y-8 lg:col-span-3">

          <UTabs
            v-model="selectedTab"
            :items="categories"
            :ui="{
              base: 'w-full',
              list: 'flex gap-2 bg-transparent rounded-full p-1',
              trigger:
                'cursor-pointer bg-transparent rounded-full text-sm transition-colors duration-200 text-secondary aria-selected:text-white',
              indicator: 'absolute rounded-full bg-btn shadow-sm',
            }"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
            <CardFoodCard
              v-for="item in paginatedItems"
              :key="item.id"
              :image="item.image"
              :title="item.name"
              :description="item.desc || 'No description available'"
              :rating="item.rating"
              :price="item.price?.price_after || 0"
            />
          </div>
          <UIPagination
            :items="filteredItems"
            :items-per-page="itemsPerPage"
            v-model:current-page="currentPage"
          />
        </section>
      </div>
    </div>
  </div>
</template>

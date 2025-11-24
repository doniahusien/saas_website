<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'">
    <div class="space-y-20 pb-10">
      <Banner
        :bannerData="{ image: '/images/food1.png', title: t('menuSection.title') }"
      />

      <div class="container mx-auto px-2">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <UIFilterSection class="lg:col-span-1" @apply="handleApplyFilters" />

          <section class="space-y-8 lg:col-span-3">
            <div v-if="isFiltering" class="flex justify-center py-10">
              <span class="loader-small"></span>
            </div>

            <div
              v-else-if="paginatedItems.length"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5"
            >
              <CardFoodCard
                v-for="item in paginatedItems"
                :key="item.id"
                :image="item.image"
                :title="item.name"
                :description="item.desc || 'No description available'"
                :rating="item.rating"
                :price="item.price?.price_after || 0"
                :isfav="item?.is_favourite"
                :favourite_id="item?.favourite_id"
                :slug="item?.slug"
                :id="item?.id"
              />
            </div>

            <div v-else class="text-center py-10 text-gray-500">
              {{ t("menu.noProducts") }}
            </div>
            <UIPagination
              v-if="filteredItems.length"
              :items="filteredItems"
              :items-per-page="itemsPerPage"
              v-model:current-page="currentPage"
            />
          </section>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  desc?: string;
  image: string;
  rating?: number;
  price?: { price_after: number };
}

const { t } = useI18n();
const { $api } = useNuxtApp();

const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || 13);
const status = ref<"pending" | "success" | "error">("pending");
const error = ref<{ statusCode?: number } | null>(null);
const products = ref<Product[]>([]);
const isFiltering = ref(false);

const itemsPerPage = 6;
const currentPage = ref(1);
const selectedTab = ref("all");

const fetchProducts = async (extraParams = {}, showSectionLoader = false) => {
  if (showSectionLoader) isFiltering.value = true;
  if (!showSectionLoader) status.value = "pending";

  try {
    const params = { ...extraParams };
    const res = await $api.get("product");
    products.value = res.data.data || [];
    if (!showSectionLoader) status.value = "success";
  } catch (err: any) {
    error.value = { statusCode: err?.response?.status || 500 };
    status.value = "error";
  } finally {
    if (showSectionLoader) isFiltering.value = false;
  }
};

const handleApplyFilters = (params: any) => fetchProducts(params, true);
onMounted(() => fetchProducts());

const filteredItems = computed(() => {
  if (selectedTab.value === "all") return products.value;
  return products.value.filter((item) =>
    item.name.toLowerCase().includes(selectedTab.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

useDynamicMeta({
  title: t("menuSection.title"),
});
</script>
<style scoped>
.loader-small {
  width: 32px;
  height: 32px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #96c650;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

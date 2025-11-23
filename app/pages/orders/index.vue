<template>

    <div class="space-y-20 pb-10">
      <Banner
        :bannerData="{ image: '/images/bg/order_bg.jpg', title: t('orders.title') }"
      />
    <div class="container mx-auto px-2">
        <div
        class=" m-auto flex w-146 justify-center rounded-full bg-white p-2 text-sm md:justify-between md:gap-2 md:text-base"
        data-wow-duration="1.3s"
        data-wow-delay="0s">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="{
            query: {
              status: item.status,
            },
          }"
          :class="[$route.query.status == item.status ?'bg-btn text-white':'' ]"
          class="flex w-28 flex-wrap items-center justify-center gap-2 rounded-full border-semi-white text-placeholder px-2 py-3 "
        >
          <h3 class="text-center font-semibold">{{ item.name }}</h3>
        </NuxtLink>
      </div>
      </div>
    </div>
</template>

<script setup lang="ts">
const {t} =useI18n();
const { $api } = useNuxtApp();

const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || 13);
const status = ref<"pending" | "success" | "error">("pending");
const error = ref<{ statusCode?: number } | null>(null);
const orders = ref([]);
const isFiltering = ref(false);

const itemsPerPage = 6;
const currentPage = ref(1);
const selectedTab = ref("");

const items = [
  {
    id: 1,
    name: t("TITLES.In Progress"),
    status: "in_progress",
  },
  {
    id: 2,
    name: $t("TITLES.Completed"),
    status: "completed",
  },
  {
    id: 3,
    name: $t("TITLES.Cancelled"),
    status: "cancelled",
  },
];


const fetchOrders = async (extraParams = {}, showSectionLoader = false) => {
  if (showSectionLoader) isFiltering.value = true;
  if (!showSectionLoader) status.value = "pending";

  try {
    const params = { store_id: storeId.value, ...extraParams };
    const res = await $api.get("orders-and-reservations", { headers: { os: "web" }, params });
    orders.value = res.data.data || [];
    if (!showSectionLoader) status.value = "success";
  } catch (err: any) {
    error.value = { statusCode: err?.response?.status || 500 };
    status.value = "error";
  } finally {
    if (showSectionLoader) isFiltering.value = false;
  }
};

const handleApplyFilters = (params: any) => fetchOrders(params, true);
onMounted(() => fetchOrders());

const filteredItems = computed(() => {
 /*  if (selectedTab.value === "all") return products.value;
  return products.value.filter((item) =>
    item.name.toLowerCase().includes(selectedTab.value.toLowerCase())
  ); */
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

useDynamicMeta({
  title: t("orders.title")
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

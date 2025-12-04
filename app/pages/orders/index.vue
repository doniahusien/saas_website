<template>
  <div class="space-y-14  bg-semi-white">
    <Banner
      :bannerData="{ image: '/images/bg/order_bg.jpg', title: t('orders.title') }"
    />

    <div class="container pb-10 mx-auto px-2 space-y-10">
      <div
        class="flex mx-auto w-full md:w-1/2 justify-center rounded-full bg-white p-2 text-sm md:gap-5 md:text-base"
      >
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="{ query: { status: item.status } }"
          class="flex w-1/3 flex-wrap items-center justify-center gap-2 rounded-full border-semi-white text-placeholder px-2 py-3"
          :class="[currentStatus == item.status ? 'bg-primary text-white' : '']"
        >
          <h3 class="font-semibold">{{ item.name }}</h3>
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="flex justify-center py-20">
        <UISmallLoader />
      </div>

      <div v-else-if="orders.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OrderCard v-for="order in orders" :key="order.id" :item="order" />
      </div>

      <div v-else class="flex min-h-60 items-center justify-center text-lg text-gray-500">
        {{ t("LABELS.no orders") }}
      </div>

      <UIPagination
        v-if="meta.last_page > 1"
        :current-page="meta.current_page"
        :total-pages="meta.last_page"
        @update:current-page="changePage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const { $api } = useNuxtApp();
const pagination = ref(null);

const orders = ref([]);
const status = ref<"pending" | "success" | "error">("pending");
const meta = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 10,
});

const currentStatus = computed(() => {
  return (route.query.status as string) || "in_progress";
});

const items = [
  { id: 1, name: t("TITLES.In Progress"), status: "in_progress" },
  { id: 2, name: t("TITLES.Completed"), status: "completed" },
  { id: 3, name: t("TITLES.Cancelled"), status: "cancelled" },
];

const fetchOrders = async (page = 1) => {
  status.value = page === 1 ? "pending" : status.value;
  try {
    const res = await $api.get("orders-and-reservations", {
      params: {
        status: currentStatus.value,
        page: page,
      },
    });

    orders.value = res.data.data || [];

    meta.value = res.data.meta;
    status.value = "success";
  } catch (err) {
    console.error(err);
    status.value = "error";
  }
};

const changePage = (page: number) => {
  fetchOrders(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(
  () => route.query.status,
  () => {
    changePage(1);
  }
);

onMounted(async () => {
  if (!route.query.status) {
    await navigateTo({ query: { status: "in_progress" } }, { replace: true });
  } else {
    fetchOrders(1);
  }
});
</script>

<template>
  <div class="space-y-10 bg-semi-white">
    <Banner :bannerData="{ image: '/images/bg/order_bg.jpg', title: t('orders.title') }" />

    <div class="container mx-auto py-10 px-2 space-y-20">

      <div class="m-auto flex w-full md:w-1/2 justify-center rounded-full bg-white p-2 text-sm md:gap-2 md:text-base">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="{ query: { status: item.status }}"
          class="flex w-1/3 flex-wrap items-center justify-center gap-2 rounded-full border-semi-white text-placeholder px-2 py-3"
          :class="[$route.query.status == item.status ? 'bg-btn text-white' : '']"
        >
          <h3 class="font-semibold">{{ item.name }}</h3>
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="flex justify-center py-20">
        <div class="loader-small"></div>
      </div>

      <div v-else-if="orders.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OrderCard v-for="order in orders" :key="order.id" :item="order" />
      </div>

      <div v-else class="flex min-h-60 items-center justify-center text-lg text-gray-500">
        {{ t("LABELS.no orders") }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { $api } = useNuxtApp();

const branchCookie = useCookie("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || 13);
const orders = ref([]);
const status = ref<"pending" | "success" | "error">("pending");

const items = [
  { id: 1, name: t("TITLES.In Progress"), status: "in_progress" },
  { id: 2, name: t("TITLES.Completed"), status: "completed" },
  { id: 3, name: t("TITLES.Cancelled"), status: "cancelled" },
];

const route = useRoute();

const fetchOrders = async () => {
  status.value = "pending";

  try {
    const res = await $api.get("orders-and-reservations", {
      params: {
        store_id: storeId.value,
        status: route.query.status || "in_progress",
      }
    });

    orders.value = res.data.data || [];
    status.value = "success";

  } catch (err) {
    status.value = "error";
  }
};

watch(() => route.query.status, fetchOrders);

onMounted(fetchOrders);
</script>

<style scoped>
.loader-small {
  width: 32px;
  height: 32px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #96c650;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}
</style>

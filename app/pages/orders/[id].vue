<template>
  <div v-if="orderData" class="bg-semi-white">
    <div class="px-18 w-full mx-auto bg-red-500 grid py-16 grid-cols-1 lg:grid-cols-2 grid-flow-col justify-between">
      <div class="space-y-9">
        <UIStepper
          v-if="
            orderData.status != 'customer_cancel' && orderData.status != 'employee_cancel'
          "
          :orderData="orderData"
        />
        <UIAddressDetail :orderData="orderData" />
        <UICallCenter :orderData="orderData" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-3">
            <p class="text-lg md:text-xl font-semibold text-black">
              {{ $t("TITLES.order type") }}
            </p>
            <div
              class="flex items-center gap-3 rounded-lg p-7 bg-white border border-gray-100"
            >
              <Icon
                :name="
                  orderData.order_type === 'take_away'
                    ? 'icon-park-outline:express-delivery'
                    : 'mage:delivery-truck'
                "
                class="size-5 text-placeholder"
              />
              <div>
                <p class="text-gray-800">
                  {{
                    orderData.order_type === "take_away"
                      ? $t("TITLES.Takeaway")
                      : $t("TITLES.Delivery")
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-base md:text-xl font-semibold text-black">
              {{ $t("TITLES.Payment Type") }}
            </p>

            <div
              class="flex items-center gap-3 rounded-lg p-7 bg-white border border-gray-100"
            >
              <Icon
                :name="
                  orderData.pay_type?.[0]?.type === 'cash'
                    ? 'icon-park-outline:wallet'
                    : 'famicons:card'
                "
                class="size-5 text-placeholder"
              />
              <div>
                <div class="text-gray-800">
                  {{
                    orderData.pay_type?.[0]?.type === "cash"
                      ? $t("TITLES.Cash")
                      : orderData.pay_type?.[0]?.type === "card"
                      ? $t("TITLES.Card")
                      : $t("TITLES.Wallet")
                  }}
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-base md:text-xl font-semibold text-black">
              {{ $t("TITLES.Date Of Order") }}
            </p>

            <div
              class="flex items-center gap-3 rounded-lg p-7 bg-white border border-gray-100"
            >
              <Icon name="mdi:calendar" class="size-6 text-placeholder" />
              <div>
                <div class="text-gray-800">
                  {{ formatDate(orderData.order_date) }}
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-base md:text-xl font-semibold text-black">
              {{ $t("TITLES.Time Of Order") }}
            </p>
            <div
              class="flex items-center gap-3 rounded-lg p-7 bg-white border border-gray-100"
            >
              <Icon name="mdi:clock-outline" class="size-5 text-placeholder" />
              <div>
                <div class="text-gray-800">
                  {{ orderData.order_time }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--     <button
            class="w-fit px-16 bg-btn hover:bg-blue-700 text-white font-semibold py-3.5 rounded-full transition shadow-md hover:shadow-lg"
          >
            Track Order
          </button> -->
      </div>

      <div class="bg-white w-full md:w-140 rounded-2xl p-4 md:p-6 shadow-md border border-gray-100">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 class="text-3xl font-bold text-gray-800">
            {{ $t("TITLES.Order ID") }}- {{ orderData.order_num }}
          </h2>
          <button
            v-if="orderData.can_cancel"
            @click="openCancelOrderModal = true"
            class="text-red-500 hover:text-red-600 font-medium cursor-pointer transition"
          >
            {{ $t("TITLES.CancleOrder") }}
          </button>
          <p v-else class="text-red-300 font-medium">
            {{ $t("TITLES.CancleOrder") }}
          </p>
        </div>

        <div class="mb-6">
          <CartItems :localProducts="orderData.item" :isCheckout="true" />
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h2 class="text-xl font-bold">
            {{ t("cart.orderSum") }}
          </h2>
          <CartOrderSummary
            :price="orderData.price_detail"
            :currency="orderData.price_detail?.currency"
          />
        </div>
      </div>
    </div>

    <ModalCancelOrderModal
      v-model="openCancelOrderModal"
      :orderId="orderData.id"
      @confirmed="handleOrderCancelled"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
const { t } = useI18n();
const route = useRoute();
const id = route.params.id;
const toast = useToast();
const { $api } = useNuxtApp();
const router = useRouter();

const openCancelOrderModal = ref(false);

const { data: orderData, pending, error, refresh } = await useAsyncData<OrderData>(
  `order-${id}`,
  async () => {
    try {
      const response = await $api.get(`/orders/${id}`);
      return response.data.data;
    } catch (err: any) {}
  }
);

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const handleOrderCancelled = () => {
  toast.success("Order cancelled successfully");
  refresh();
};
</script>

<template>
  <div v-if="orderData" class="bg-semi-white">
    <div
      class="px-10 md:px-16 w-full grid py-18 grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-18 mx-auto"
    >
      <div class="space-y-9 lg:col-span-3">
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
                :name="paymentPrimary.icon"
                class="size-5 text-placeholder"
              />
              <div>
                <div class="text-gray-800 font-medium">
                  {{ paymentPrimary.label }}
                </div>
                <div
                  v-if="paymentBreakdown.length"
                  class="mt-2 space-y-1 text-sm text-placeholder"
                >
                  <div
                    v-for="method in paymentBreakdown"
                    :key="method.key"
                    class="flex items-center justify-between gap-6"
                  >
                    <span>{{ method.label }}</span>
                    <span v-if="method.amount !== null" class="font-semibold">
                      {{ formatPaymentAmount(method.amount) }}
                      <span v-if="orderCurrency" class="text-xs font-normal">
                        {{ orderCurrency }}
                      </span>
                    </span>
                  </div>
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
      <div
      class="grid gap-x-4"
      v-if="
        orderData.cancel_reason?.desc &&
        (orderData.status == 'customer_cancel' || orderData.status == 'employee_cancel')
      "
    >
      <div class="space-y-2">
        <h2 class="text-xl font-semibold capitalize">
          {{ $t("TITLES.Cancellation reason") }}
        </h2>
        <div
          class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-website_white px-2 md:px-6"
        >
          <p class="font-medium">{{ orderData?.cancel_reason.desc }}</p>
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

      <div
        class="w-full md:w-140 lg:col-span-2 rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 mx-auto"
      >
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 class="text-xl lg:text-3xl font-bold text-gray-800">
            {{ $t("TITLES.Order ID") }}- {{ orderData.order_num }}
          </h2>

          <div
            v-if="
              orderData.status == 'customer_cancel' ||
              orderData.status == 'employee_cancel' ||
              orderData.status == 'cancel'
            "
            class="flex items-center gap-2 text-lg text-red-500 font-extrabold capitalize"
          >
            <Icon name="fluent:box-dismiss-20-regular" class="size-6" />

            <p>{{ $t("LABELS.canceled") }}</p>
          </div>
          <div
            class="flex items-center gap-2 text-lg font-semibold text-[#52B788]"
            v-else-if="orderData.status == 'finished'"
          >
            <Icon name="fluent:box-checkmark-28-regular" />
            {{ $t("TITLES.Completed") }}
          </div>
          <template v-else>
            <button
              @click="openCancelOrderModal = true"
              class="text-lg text-error disabled:text-error disabled:opacity-20"
              v-if="orderData.order_status[2]"
              :disabled="!orderData.can_cancel"
            >
              {{ $t("TITLES.Cancel Order") }}
            </button>
          </template>

          <!--    <button
            v-if="orderData.can_cancel"
           
            class="text-red-500 hover:text-red-600 font-medium cursor-pointer transition"
          >
            {{ $t("TITLES.CancleOrder") }}
          </button> -->
          <!--   <p v-else class="text-red-300 font-medium">
            {{ $t("TITLES.CancleOrder") }}
          </p> -->
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

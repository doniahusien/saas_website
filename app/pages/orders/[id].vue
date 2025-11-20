<template>
  <div v-if="orderData" class="min-h-screen bg-semi-white py-8">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-3 space-y-8">
          <UIStepper :orderData="orderData" />
          <UIAddressDetail :orderData="orderData" />
          <UICallCenter :orderData="orderData" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-3">
              <p class="text-base md:text-lg font-semibold text-black">Order Type</p>
              <div
                class="flex items-center gap-3 rounded-lg p-5 bg-white  border border-gray-100"
              >
                <Icon
                  :name="
                    orderData.order_type === 'take_away'
                      ? 'icon-park-outline:express-delivery'
                      : 'mage:delivery-truck'
                  "
                  class="w-5 h-5 text-placeholder"
                />
                <div>
                  <p class="text-gray-800">
                    {{ orderData.order_type === "take_away" ? "Takeaway" : "Delivery" }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-3">
                <p class="text-base md:text-lg font-semibold text-black">Payment Type</p>

              <div
                class="flex items-center gap-3 rounded-lg p-5 bg-white  border border-gray-100"
              >
                <Icon
                  :name="
                    orderData.pay_type?.[0]?.type === 'cash'
                      ? 'icon-park-outline:wallet'
                      : 'famicons:card'
                  "
                  class="w-5 h-5 text-placeholder"
                />
                <div>
                  <div class="font-semibold text-gray-800">
                    {{
                      orderData.pay_type?.[0]?.type === "cash"
                        ? "Cash on delivery"
                        : orderData.pay_type?.[0]?.type === "card"
                        ? "Card"
                        : "Wallet"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
               <p class="text-base md:text-lg font-semibold text-black">Date Of Order</p>

              <div
                class="flex items-center gap-3 rounded-lg p-5 bg-white border border-gray-100"
              >
                <Icon name="mdi:calendar" class="w-6 h-6 text-placeholder" />
                <div>
                  <div class="font-semibold text-gray-800">
                    {{ formatDate(orderData.order_date) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <p class="text-base md:text-lg font-semibold text-black">Time Of Order</p>
              <div
                class="flex items-center gap-3 rounded-lg p-5 bg-white border border-gray-100"
              >
                <Icon name="mdi:clock-outline" class="w-5 h-5 text-placeholder" />
                <div>
                  <div class="font-semibold text-gray-800">
                    {{ orderData.order_time }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="w-fit px-16 bg-btn hover:bg-blue-700 text-white font-semibold py-3.5 rounded-full transition shadow-md hover:shadow-lg"
          >
            Track Order
          </button>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100">
            <div
              class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200"
            >
              <h2 class="text-2xl font-bold text-gray-800">
                Order ID - {{ orderData.order_num }}
              </h2>
              <button
                v-if="orderData.can_cancel"
                @click="openCancelOrderModal = true"
                class="text-red-500 hover:text-red-600 font-medium cursor-pointer transition"
              >
                Cancel Order
              </button>
            </div>

            <div class="mb-6">
              <h3 class="text-xl font-bold mb-4 text-gray-800">Ordered Items</h3>
              <CartItems :localProducts="mappedOrderItems" :isCheckout="true" />
            </div>

            <div class="border-t border-gray-200 pt-6">
              <Summary
                :itemCount="orderData.item_count"
                :subtotal="
                  orderData.price_detail?.total_item_price_before_discount?.toFixed(2) ||
                  0
                "
                :shipping="orderData.price_detail?.delivery_price?.toFixed(2) || '0.00'"
                :discount="orderData.price_detail?.discount_value?.toFixed(2) || 0"
                :tax="orderData.price_detail?.tax_rate_value?.toFixed(2) || 0"
                :taxPercentage="orderData.price_detail?.tax_rate_percentage || null"
                :surcharge="orderData.price_detail?.surcharge_value?.toFixed(2) || 0"
                :total="orderData.price_detail?.total_price?.toFixed(2) || 0"
                :currency="orderData.price_detail?.currency || 'EGP'"
              />
            </div>
          </div>
        </div>
      </div>

      <ModalCancelOrderModal
        v-model="openCancelOrderModal"
        :orderId="orderData.id"
        @confirmed="handleOrderCancelled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const route = useRoute();
const id = route.params.id;
const toast = useToast();
const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;
const router = useRouter();

const openCancelOrderModal = ref(false);

const { data: orderData, pending, error, refresh } = await useAsyncData<OrderData>(
  `order-${id}`,
  async () => {
    try {
      const response = await api.get(`/orders/${id}`);
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

const mappedOrderItems = computed(() => {
  if (!orderData.value?.item) return [];

  return orderData.value.item.map((item: any) => ({
    id: item.id,
    name: item.product.name,
    image: item.product.image,
    quantity: item.quantity,
    total_price: item.total_price,
    sub_modifiers: item.sub_modifiers || [],
    product: item.product,
  }));
});
</script>

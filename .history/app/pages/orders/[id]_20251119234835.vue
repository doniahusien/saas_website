<template>
  <UILoader v-if="pending" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <div v-else-if="orderData" class="min-h-screen bg-semi-white py-8">
    <div class="container mx-auto px-4 md:px-6">
        <!-- Order Status Progress Bar -->
        <div class="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-md">
          <div class="flex items-center justify-between w-full">
            <div
              v-for="(status, index) in orderData.order_status"
              :key="status.key"
              class="flex items-center flex-1 relative"
            >
              <div class="flex flex-col items-center flex-1 z-10">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-md transition-all"
                  :class="
                    status.status === 'in_progress'
                      ? 'bg-blue-600 text-white scale-110'
                      : status.status === 'completed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  "
                >
                  <Icon
                    v-if="status.status === 'completed' || status.status === 'in_progress'"
                    name="mdi:check"
                    class="w-7 h-7"
                  />
                  <Icon v-else name="mdi:clock-outline" class="w-6 h-6" />
                </div>
                <span
                  class="text-sm font-semibold text-center"
                  :class="
                    status.status === 'in_progress' || status.status === 'completed'
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  "
                >
                  {{ status.value }}
                </span>
              </div>
              <div
                v-if="index < orderData.order_status.length - 1"
                class="h-1.5 flex-1 mx-4 -mt-8 rounded-full transition-all"
                :class="
                  status.status === 'completed' || status.status === 'in_progress'
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                "
              ></div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column - Order Information -->
          <div class="lg:col-span-1 space-y-4">
            <!-- Shipping Address / Store Address -->
            <div class="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon name="mdi:map-marker" class="w-5 h-5 text-blue-600" />
                </div>
                <h3 class="text-lg font-bold text-gray-800">Shipping Address</h3>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed ml-14">
                {{
                  orderData.address?.location_description ||
                  orderData.store?.location_description ||
                  orderData.store?.complete_name ||
                  "No address available"
                }}
              </p>
            </div>

            <!-- Call Center -->
            <div class="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon name="mdi:phone" class="w-5 h-5 text-blue-600" />
                </div>
                <h3 class="text-lg font-bold text-gray-800">Call Center</h3>
              </div>
              <div class="flex items-center justify-between ml-14">
                <div class="flex items-center gap-2">
                  <span class="text-gray-700 font-medium">{{ orderData.call_center }}</span>
                </div>
                <a
                  :href="`tel:${orderData.call_center}`"
                  class="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  <Icon name="mdi:phone" class="w-5 h-5" />
                </a>
              </div>
            </div>

            <!-- Order Type -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div class="flex items-center gap-3">
                <Icon
                  :name="orderData.order_type === 'take_away' ? 'icon-park-outline:express-delivery' : 'mage:delivery-truck'"
                  class="w-6 h-6 text-blue-600"
                />
                <span class="font-semibold text-gray-800">
                  {{ orderData.order_type === "take_away" ? "Takeaway" : "Delivery" }}
                </span>
              </div>
            </div>

            <!-- Payment Type -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div class="flex items-center gap-3">
                <Icon 
                  :name="orderData.pay_type?.[0]?.type === 'cash' ? 'icon-park-outline:wallet' : 'famicons:card'"
                  class="w-6 h-6 text-blue-600" 
                />
                <span class="font-semibold text-gray-800">
                  {{
                    orderData.pay_type?.[0]?.type === "cash"
                      ? "Cash on delivery"
                      : orderData.pay_type?.[0]?.type === "card"
                      ? "Card"
                      : "Wallet"
                  }}
                </span>
              </div>
            </div>

            <!-- Date Of Order -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div class="flex items-center gap-3">
                <Icon name="mdi:calendar" class="w-6 h-6 text-blue-600" />
                <span class="font-semibold text-gray-800">
                  {{ formatDate(orderData.order_date) }}
                </span>
              </div>
            </div>

            <!-- Time Of Order -->
            <div class="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div class="flex items-center gap-3">
                <Icon name="mdi:clock-outline" class="w-6 h-6 text-blue-600" />
                <span class="font-semibold text-gray-800">{{ orderData.order_time }}</span>
              </div>
            </div>

            <!-- Track Order Button -->
            <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition shadow-md hover:shadow-lg"
            >
              Track Order
            </button>
          </div>

          <!-- Right Column - Order Details -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100">
              <!-- Order ID and Cancel Button -->
              <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-800">Order ID - {{ orderData.order_num }}</h2>
                <button
                  v-if="orderData.can_cancel"
                  @click="openCancelOrderModal = true"
                  class="text-red-500 hover:text-red-600 font-medium cursor-pointer transition"
                >
                  Cancel Order
                </button>
              </div>

              <!-- Ordered Items -->
              <div class="mb-6">
                <h3 class="text-xl font-bold mb-4 text-gray-800">Ordered Items</h3>
                <CartItems
                  :localProducts="mappedOrderItems"
                  :isCheckout="true"
                />
              </div>

              <!-- Order Summary -->
              <div class="border-t border-gray-200 pt-6">
                <Summary
                  :itemCount="orderData.item_count"
                  :subtotal="orderData.price_detail?.total_item_price_before_discount?.toFixed(2) || 0"
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
    } catch (err: any) {
      throw createError({
        statusCode: err?.response?.status || 500,
        message: err?.message || "Failed to load order details",
      });
    }
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

// Map order items to match CartItems component format
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

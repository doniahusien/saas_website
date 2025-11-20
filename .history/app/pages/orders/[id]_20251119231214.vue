<template>
  <UILoader v-if="pending" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="orderData">
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <!-- Order Status Progress Bar -->
        <div class="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div
              v-for="(status, index) in orderData.order_status"
              :key="status.key"
              class="flex items-center flex-1"
            >
              <div class="flex flex-col items-center flex-1">
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  :class="
                    status.status === 'in_progress'
                      ? 'bg-blue-600 text-white'
                      : status.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  "
                >
                  <Icon
                    v-if="status.status === 'completed' || status.status === 'in_progress'"
                    name="mdi:check"
                    class="w-6 h-6"
                  />
                  <Icon v-else name="mdi:clock-outline" class="w-6 h-6" />
                </div>
                <span
                  class="text-sm font-medium"
                  :class="
                    status.status === 'in_progress' || status.status === 'completed'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  "
                >
                  {{ status.value }}
                </span>
              </div>
              <div
                v-if="index < orderData.order_status.length - 1"
                class="h-1 flex-1 mx-2 -mt-6"
                :class="
                  status.status === 'completed' || status.status === 'in_progress'
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
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
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="flex items-center gap-3 mb-4">
                <Icon name="mdi:map-marker" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-bold">Shipping Address</h3>
              </div>
              <p class="text-gray-600 text-sm">
                {{
                  orderData.address?.location_description ||
                  orderData.store?.location_description ||
                  orderData.store?.complete_name ||
                  "No address available"
                }}
              </p>
            </div>

            <!-- Call Center -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="flex items-center gap-3 mb-4">
                <Icon name="mdi:phone" class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-bold">Call Center</h3>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-gray-600">{{ orderData.call_center }}</span>
                </div>
                <a
                  :href="`tel:${orderData.call_center}`"
                  class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Icon name="mdi:phone" class="w-5 h-5" />
                </a>
              </div>
            </div>

            <!-- Order Type -->
            <div class="bg-white rounded-2xl p-4 shadow-sm">
              <div class="flex items-center gap-3">
                <Icon
                  :name="orderData.order_type === 'take_away' ? 'icon-park-outline:express-delivery' : 'mage:delivery-truck'"
                  class="w-6 h-6 text-blue-600"
                />
                <span class="font-semibold">
                  {{ orderData.order_type === "take_away" ? "Takeaway" : "Delivery" }}
                </span>
              </div>
            </div>

            <!-- Payment Type -->
            <div class="bg-white rounded-2xl p-4 shadow-sm">
              <div class="flex items-center gap-3">
                <Icon name="famicons:card" class="w-6 h-6 text-blue-600" />
                <span class="font-semibold">
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
            <div class="bg-white rounded-2xl p-4 shadow-sm">
              <div class="flex items-center gap-3">
                <Icon name="mdi:calendar" class="w-6 h-6 text-blue-600" />
                <span class="font-semibold">
                  {{ formatDate(orderData.order_date) }}
                </span>
              </div>
            </div>

            <!-- Time Of Order -->
            <div class="bg-white rounded-2xl p-4 shadow-sm">
              <div class="flex items-center gap-3">
                <Icon name="mdi:clock-outline" class="w-6 h-6 text-blue-600" />
                <span class="font-semibold">{{ orderData.order_time }}</span>
              </div>
            </div>

            <!-- Track Order Button -->
            <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Track Order
            </button>
          </div>

          <!-- Right Column - Order Details -->
          <div class="lg:col-span-2 space-y-4">
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <!-- Order ID and Cancel Button -->
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Order ID - {{ orderData.order_num }}</h2>
                <button
                  v-if="orderData.can_cancel"
                  @click="openCancelOrderModal = true"
                  class="text-red-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  Cancel Order
                </button>
              </div>

              <!-- Ordered Items -->
              <div class="space-y-4 mb-6">
                <h3 class="text-xl font-bold mb-4">Ordered Items</h3>
                <div
                  v-for="item in orderData.item"
                  :key="item.id"
                  class="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <NuxtImg
                    :src="item.product.image"
                    :alt="item.product.name"
                    class="w-20 h-20 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold text-lg">{{ item.product.name }}</h4>
                    <p class="text-sm text-gray-600 mb-2">{{ item.product.desc }}</p>
                    <div
                      v-if="item.sub_modifiers && item.sub_modifiers.length > 0"
                      class="text-xs text-gray-500 mb-2"
                    >
                      <div
                        v-for="subMod in item.sub_modifiers"
                        :key="subMod.id"
                        class="mb-1"
                      >
                        <span class="font-medium">{{ subMod.name }}: </span>
                        <span
                          v-for="(modifier, idx) in subMod.item_modifiers"
                          :key="modifier.id"
                        >
                          {{ modifier.name
                          }}{{ idx < subMod.item_modifiers.length - 1 ? ", " : "" }}
                        </span>
                      </div>
                    </div>
                    <p class="font-semibold text-lg">
                      {{ item.total_price }} {{ orderData.price_detail?.currency || "EGP" }}
                    </p>
                  </div>
                  <div class="flex items-center">
                    <span class="text-gray-600">x{{ item.quantity }}</span>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="border-t pt-4">
                <h3 class="text-xl font-bold mb-4">Order Summary</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal ({{ orderData.item_count }} Item{{ orderData.item_count !== 1 ? 's' : '' }})</span>
                    <span class="font-semibold">
                      {{ orderData.price_detail?.total_item_price_before_discount?.toFixed(2) || 0 }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span class="font-semibold">
                      {{ orderData.price_detail?.delivery_price?.toFixed(2) || "0.00" }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                  <div
                    v-if="orderData.price_detail?.discount_value > 0"
                    class="flex justify-between text-gray-600"
                  >
                    <span>Discount</span>
                    <span class="font-semibold text-green-600">
                      -{{ orderData.price_detail?.discount_value?.toFixed(2) || 0 }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                  <div
                    v-if="orderData.price_detail?.tax_rate_value > 0"
                    class="flex justify-between text-gray-600"
                  >
                    <span>Tax ({{ orderData.price_detail?.tax_rate_percentage }}%)</span>
                    <span class="font-semibold">
                      {{ orderData.price_detail?.tax_rate_value?.toFixed(2) || 0 }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                  <div
                    v-if="orderData.price_detail?.surcharge_value > 0"
                    class="flex justify-between text-gray-600"
                  >
                    <span>Surcharge</span>
                    <span class="font-semibold">
                      {{ orderData.price_detail?.surcharge_value?.toFixed(2) || 0 }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                  <div class="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span>
                      {{ orderData.price_detail?.total_price?.toFixed(2) || 0 }}
                      {{ orderData.price_detail?.currency || "EGP" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Order Modal -->
    <ModalCancelOrderModal
      v-model="openCancelOrderModal"
      :orderId="orderData.id"
      @confirmed="handleOrderCancelled"
    />
  </template>
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
</script>

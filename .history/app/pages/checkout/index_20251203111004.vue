<template>
  <div class="min-h-screen bg-semi-white w-full flex justify-center py-8">
    <div class="w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
      <CheckoutOrder
        :orderType="orderType"
        :schedule="selectedSchedule"
        :paymentType="paymentType"
        :selectedBranch="selectedBranch"
        :selectedAddress="selectedAddress"
        :submitting="submitting"
        @update:orderType="orderType = $event"
        @update:schedule="selectedSchedule = $event"
        @update:paymentType="paymentType = $event"
        @open-delivery-modal="openDeliveryAddressModal = true"
        @open-branch-modal="openAddressModal = true"
        @confirm="confirmOrder"
      />

      <div class="lg:col-span-2 space-y-5 p-5 rounded-3xl bg-white">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold">{{ $t("TITLES.items") }}</h3>
          <!--  <button 
            @click="openCancelOrderModal = true"
            class="cursor-pointer text-red-500 text-sm font-medium"
          >
            Cancel Order
          </button> -->
        </div>

        <CartItems
          :localProducts="carts.products"
          :removeFromCart="removeFromCart"
          :updateQty="updateQty"
          :isCheckout="true"
        />

        <h4 class="text-xl font-bold">{{ $t("TITLES.Promo Code") }}</h4>
        <PromoInput placeholder="Enter Promo Code" icon="bxs:offer" />
        <div v-if="availablePoints > 0" class="mt-4 flex items-center gap-3">
          <input
            type="checkbox"
            id="use-points"
            v-model="useLoyaltyPoints"
            class="size-5 text-green-600 rounded focus:ring-green-500"
          />
          <label
            for="use-points"
            class="flex items-center gap-2 cursor-pointer select-none"
          >
            <span class="text-base font-medium">{{$t('LABELS.Use your loyalty points')}}</span>
            <span
              class="px-3 py-1 text-sm font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-full"
            >
              {{ availablePoints }} Points
            </span>
          </label>
        </div>
        <!--    <PromoInput placeholder="Add Loyalty Amount" icon="lucide-lab:coins-stack" /> -->

        <!--  <p class="text-base text-gold mt-2">Total Amount : 500 Points / 100 EGP</p> -->
        <CartOrderSummary :price="price" :currency="currency" />
      </div>
      <ModalAddressModal v-model="openAddressModal" @select="handleBranchSelect" />
      <ModalDeliveryAddressModal
        v-model="openDeliveryAddressModal"
        @selectAddress="handleAddressSelect"
      />

      <ModalCreditModal v-model="openCreditModal" />

      <ModalOrderSuccessModal
        :show="showSuccessModal"
        :orderId="newOrderId"
        @update:show="showSuccessModal = $event"
      />

      <ModalCancelOrderModal
        v-model="openCancelOrderModal"
        @confirmed="handleCancelOrder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useNuxtApp } from "#app";
import { useForm, useField } from "vee-validate";
import { format } from "date-fns";
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

const appStore = useAppStore();
const { t } = useI18n();
const cartsCount = computed(() => appStore.getCartCount);
const carts = computed(() => appStore.getCartData);
const price = computed(() => appStore.getCartPrice);
const currency = computed(() => appStore.getCartCurrency);

const orderType = ref("delivery");
const paymentType = ref("cash");
const selectedSchedule = ref("now");
const takeway = ref(false);

const openCreditModal = ref<boolean>(false);
const openCancelOrderModal = ref<boolean>(false);
const openAddressModal = ref<boolean>(false);
const openDeliveryAddressModal = ref<boolean>(false);

const selectedBranch = ref<Branch | null>(null);
const selectedAddress = ref<any | null>(null);

const availablePoints = computed(() => appStore.getAvailablePoints);
const availableWallet = computed(() => appStore.getAvailableWallet);
const totalPrice = computed(() => appStore.getCartPrice?.total || 0);
const useLoyaltyPoints = ref(false);
const useWallet = ref(false);

const submitting = ref(false);

const { values: formValues } = useForm();
const dateValue = computed(() => formValues.date);
const timeValue = computed(() => formValues.timeTo);

const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;
const toast = useToast();
const authStore = useAppAuth();
const userWallet = computed(() => authStore.userData?.wallet ?? 0);
const showSuccessModal = ref(false);
const newOrderId = ref(null);

const handleBranchSelect = (branch: Branch) => {
  selectedBranch.value = branch;
  openAddressModal.value = false;
};

const handleAddressSelect = (address) => {
  selectedAddress.value = address;
  openDeliveryAddressModal.value = false;
};

const loadAddresses = async () => {
  try {
    const res = await api.get("/address");
    const list = res.data?.data ?? [];
    if (list.length > 0) {
      selectedAddress.value = list[0];
    }
  } catch (e) {}
};

onMounted(() => {
  loadAddresses();
});

const confirmOrder = async (values) => {
  submitting.value = true;
  try {
    const form = new FormData();

    form.append(
      "order_type",
      orderType.value === "takeaway" ? "take_away" : orderType.value
    );

    form.append("is_schedule", String(selectedSchedule.value === "schedule" ? 1 : 0));

    if (selectedSchedule.value === "schedule") {
      try {
        if (dateValue.value) {
          let dateObj;
          if (dateValue.value instanceof Date) {
            dateObj = dateValue.value;
          } else if (typeof dateValue.value === "string") {
            dateObj = new Date(dateValue.value);
          } else if (Array.isArray(dateValue.value)) {
            dateObj = dateValue.value[0];
          }

          if (dateObj && dateObj instanceof Date && !isNaN(dateObj.getTime())) {
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            form.append("order_date", `${year}-${month}-${day}`);
            console.log("Date sent:", `${year}-${month}-${day}`);
          }
        }
      } catch (e) {
        console.error("Date formatting error:", dateValue.value, e);
      }

      if (timeValue.value) {
        try {
          let timeObj = timeValue.value;
          if (typeof timeObj === "object" && "hours" in timeObj) {
            const hours24 = timeObj.hours;
            const minutes = timeObj.minutes;

            const period = hours24 >= 12 ? "PM" : "AM";
            const hours12 = hours24 % 12 || 12;

            const formattedHours = String(hours12).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");

            const timeStr = `${formattedHours}:${formattedMinutes} ${period}`;
            form.append("order_time", timeStr);
          }
          if (timeObj instanceof Date && !isNaN(timeObj.getTime())) {
            const hours24 = timeObj.getHours();
            const minutes = timeObj.getMinutes();

            const period = hours24 >= 12 ? "PM" : "AM";
            const hours12 = hours24 % 12 || 12;

            const formattedHours = String(hours12).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");

            const timeStr = `${formattedHours}:${formattedMinutes} ${period}`;
            form.append("order_time", timeStr);
          }
        } catch (e) {
          console.error("Time formatting error:", timeValue.value, e);
        }
      }
    }

    const addressId =
      orderType.value === "delivery"
        ? selectedAddress.value?.id ?? ""
        : selectedBranch.value?.id ?? "";
    if (addressId) form.append("address_id", String(addressId));

    if (orderType.value === "take_away")
    form.append("store_id", String(selectedBranch.value.id));
    form.append("code", "");
    form.append("note", "");

    const total = totalPrice.value;
    const points = availablePoints.value;
    const wallet = availableWallet.value;
    const mainMethod = paymentType.value;

    const payType: any[] = [];
    let remaining = total;

    // Add loyalty points if used
    if (useLoyaltyPoints.value && points > 0 && remaining > 0) {
      const usedPoints = Math.min(points, remaining);
      payType.push({ points: usedPoints });
      remaining -= usedPoints;
    }

    // Add wallet if available and there's remaining balance
    if (wallet > 0 && remaining > 0) {
      const used = Math.min(wallet, remaining);
      payType.push({ wallet: used });
      remaining -= used;
    }

    // Add main payment method (cash/card) for remaining balance
    if (remaining > 0) {
      payType.push({ [mainMethod]: Number(remaining.toFixed(2)) });
    }

    // If no payment method selected and no points/wallet, use main method for full amount
    if (payType.length === 0) {
      payType.push({ [mainMethod]: Number(total.toFixed(2)) });
    }

    form.append("pay_type", JSON.stringify(payType));
    form.append("has_loyal", useLoyaltyPoints.value && points > 0 ? "1" : "0");
    const response = await api.post("/orders", form);

    newOrderId.value = response.data.data.id;
    showSuccessModal.value = true;
    toast.success("Order placed successfully");
  } catch (err: any) {
    const message = err?.message || err?.response?.data?.message || "Order failed";
    toast.error(message);
    console.log(err);
  } finally {
    submitting.value = false;
  }
};

watch(paymentType, (val) => {
  if (val === "card") {
    openCreditModal.value = true;
  }
});

const router = useRouter();

const handleCancelOrder = () => {
  router.push("/");
};
</script>

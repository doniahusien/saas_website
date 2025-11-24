<template>
  <div class="min-h-screen bg-semi-white flex justify-center py-8">
    <div class="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div class="lg:col-span-3 px-10 space-y-5">
        <h2 class="text-xl font-bold">Types of Order</h2>
        <div class="flex gap-6 w-full">
          <RadioBox
            label="Delivery"
            icon="mage:delivery-truck"
            name="orderType"
            value="delivery"
            v-model="orderType"
          />

          <RadioBox
            label="Takeaway"
            icon="icon-park-outline:express-delivery"
            name="orderType"
            value="takeaway"
            v-model="orderType"
          />
        </div>

        <div v-if="orderType === 'delivery'" class="space-y-4">
          <h5 class="text-xl font-bold">Your Shipping Address</h5>
          <div class="flex items-center gap-4 p-2 bg-white">
            <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

            <div class="flex flex-col gap-4 p-2 justify-between">
              <p class="text-base font-semibold">
                {{
                  selectedAddress?.title ?? selectedAddress?.name ?? "Shipping Address"
                }}
              </p>
              <p class="text-sm text-placeholder">
                {{
                  selectedAddress?.location_description ??
                  selectedAddress?.desc ??
                  "Abu Al Feda, Zamalek, Cairo Governorate 4271110"
                }}
              </p>
            </div>
            <button
              @click="openDeliveryAddressModal = true"
              class="ml-auto cursor-pointer text-subtitle hover:text-black"
            >
              <Icon name="mynaui:edit-one" class="w-6 h-6" />
            </button>
          </div>
          <ModalDeliveryAddressModal
            v-model="openDeliveryAddressModal"
            @selectAddress="handleAddressSelect"
          />
        </div>
        <div v-else>
          <h5 class="text-xl font-bold">Branch</h5>
          <div class="flex items-center gap-4 p-2 bg-white">
            <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

            <div class="flex flex-col gap-4 p-2 justify-between">
              <p class="text-base font-semibold">
                {{ selectedBranch?.name ?? "Select Branch" }}
              </p>
              <p class="text-sm text-placeholder">
                {{
                  selectedBranch?.location_description ??
                  selectedBranch?.address ??
                  "Abu Al Feda, Zamalek, Cairo Governorate 4271110"
                }}
              </p>
            </div>
            <button
              @click="openAddressModal = true"
              class="ml-auto cursor-pointer text-placeholder hover:text-black"
            >
              <Icon name="fe:arrow-down" class="w-6 h-6" />
            </button>
          </div>
          <ModalAddressModal v-model="openAddressModal" @select="handleBranchSelect" />
        </div>
        <div>
          <div class="flex items-center gap-6">
            <RadioBox
              label="Schedule Order"
              icon=""
              name="schedule"
              value="schedule"
              v-model="selectedSchedule"
            />
            <RadioBox
              label="Order Now"
              icon=""
              name="schedule"
              value="now"
              v-model="selectedSchedule"
            />
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
            v-if="selectedSchedule === 'schedule'"
          >
            <inputsDatePicker name="date" placeholder="date" :checkout="true" />
            <inputsTimePicker name="timeTo" placeholder="time" :checkout="true" />
          </div>
        </div>
        <h6 class="text-xl font-bold">Payment methods</h6>
        <div class="flex gap-6">
          <RadioBox
            label="Card"
            icon="famicons:card"
            name="paymentType"
            value="card"
            v-model="paymentType"
          />

          <RadioBox
            label="Cash"
            icon="icon-park-outline:wallet"
            name="paymentType"
            value="cash"
            v-model="paymentType"
          />
          <ModalCreditModal v-model="openCreditModal" />
        </div>

        <div class="flex">
          <button
            @click="confirmOrder"
            :disabled="submitting"
            class="w-1/2 h-14 bg-btn text-white text-lg font-semibold rounded-full mt-4 shadow-md hover:opacity-90 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!submitting">Confirm</span>
            <span v-else>Placing...</span>
          </button>
          <ModalOrderSuccessModal
            :show="showSuccessModal"
            :orderId="newOrderId"
            @update:show="showSuccessModal = $event"
          />
        </div>
      </div>

      <ModalCancelOrderModal
        v-model="openCancelOrderModal"
        @confirmed="handleCancelOrder"
      />

      <div class="lg:col-span-2 space-y-5 p-5 rounded-3xl bg-white">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold">{{$t('TITLES.items')}}</h3>
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

        <h4 class="text-xl font-bold">{{$t('TITLES.Promo Code')}}</h4>
        <PromoInput placeholder="Enter Promo Code" icon="bxs:offer" />
        <PromoInput placeholder="Add Loyalty Amount" icon="lucide-lab:coins-stack" />

        <p class="text-base text-gold mt-2">Total Amount : 500 Points / 100 EGP</p>
   <CartOrderSummary :price="price" :currency="currency" />
      </div>
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
const price= computed(() => appStore.getCartPrice);
const currency = computed(() => appStore.getCartCurrency);

const orderType = ref("delivery");
const paymentType = ref("cash");
const selectedSchedule = ref("now");
const takeway = ref(false);
const openAddressModal = ref<boolean>(false);
const openDeliveryAddressModal = ref<boolean>(false);
const selectedBranch = ref<Branch | null>(null);
const selectedAddress = ref<any | null>(null);
const openCreditModal = ref<boolean>(false);
const openCancelOrderModal = ref<boolean>(false);
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

const confirmOrder = async () => {
  submitting.value = true;
  try {
    const form = new FormData();
    form.append(
      "order_type",
      orderType.value === "takeaway" ? "take_away" : orderType.value
    );
    form.append("has_loyal", String(0));
    form.append("has_wallet", String(0));
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

    const addressId = orderType.value === "delivery"? selectedAddress.value?.id ?? "" : selectedBranch.value?.id ?? "";
    if (addressId) form.append("address_id", String(addressId));
    form.append("note", "");
    if (orderType.value === "take_away") form.append("store_id", String(selectedBranch.value.id));
    form.append("code", "");

    form.append("pay_type", JSON.stringify([{ wallet: 96 }]));
    const response = await api.post("/orders", form);
    newOrderId.value = response.data.data.id;
    console.log("Order Response:", response.data);
    showSuccessModal.value = true;
    toast.success(t("Order placed successfully") || "Order placed successfully");
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

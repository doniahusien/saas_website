<template>
 
  <div
    class="container mx-auto grid grid-cols-1 gap-12 pb-24 pt-8 bg-semi-white xl:grid-cols-2"
  >
    <reservation
      :items="item"
      @reload="updateReservationDetails"
      @onlinePay="creditPay"
      :loading="loading"
    />
    <reservation-payment-details :items="item" />
    <general-modal
      :persist="true"
      v-if="successModal"
      :hasCloseBtn="false"
      classes="md:w-36 w-full m-auto bg-white !max-h-128 !min-h-24 space-y-5 text-center"
    >
      <div class="space-y-2">
        <img
          src="/images/success.gif"
          alt="success"
          class="m-auto size-36"
        />
        <h2 class="text-3xl font-bold">
          {{ $t("LABELS.successful") }}
        </h2>
        <p class="capitalize text-black">
          {{ $t("LABELS.The amount has been paid successfully") }}
        </p>
      </div>
    </general-modal>
  </div>
</template>

<script setup>
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();
const {$api} = useNuxtApp();
const route = useRoute();
const orderLoading = ref(false);
const loading = ref(false);
const item = ref(null);
const i18n = useI18n();
const token = useCookie("jwt_token_saas");
const successModal = ref(false);


function updateReservationDetails(values) {
  item.value = values;
}

function getOrderDetails() {
  orderLoading.value = true;
  $api
    .get(`/reservations/${route.params.id}`)
    .then((res) => {
      item.value = res.data.data;
      orderLoading.value = false;
    })
    .catch(() => (orderLoading.value = false));
}

const pending = ref(false);

const creditPay = async (body) => {
  pending.value = true;
  try {
    const response = await $fetch("/api/create-reservation", {
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    pending.value = false;

    if (response.url) {
      window.location.href = response.url;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    pending.value = false;
    toast.error(error.message || "Payment failed");
  }
};

function completePayment(id, session_id) {
  const frmData = new FormData();
  frmData.append("transactionId", session_id);
  loading.value = true;
  $api
    .put(`/reservations/${id}/is-payment`, frmData)
    .then((res) => {
      successModal.value = true;
      setTimeout(() => {
        successModal.value = false;
      }, 3000);
      setTimeout(() => toast.success(res.data.message), 300);
      loading.value = false;
      item.value.is_paid = res.data.data.is_paid;
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e.response.data.message || "Payment completion failed");
    });
}

onMounted(() => {
  getOrderDetails();
  if (route.query.session_id) {
    setTimeout(() => {
      completePayment(route.params.id, route.query.session_id);
    }, 500);
  }
});
</script>

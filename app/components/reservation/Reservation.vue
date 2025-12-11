<template>
  <div class="fadeInLeft px-8 md:px-6 lg:px-0 space-y-5" v-if="items">
    <div class="flex flex-wrap justify-between">
      <h2 class="flex items-center gap-2 text-lg font-semibold">
        <Icon name="bx:map" class="size-6 " />
        {{
          items.order_type == "delivery"
            ? $t("TITLES.Shipping Address")
            : $t("TITLES.branch")
        }}
      </h2>
      <div>
        <div
          v-if="items.status == 'cancelled'"
          class="flex items-center gap-2 text-base font-bold capitalize text-error"
        >
            <Icon name="fluent:box-dismiss-20-regular" class="size-6" />
          <p>{{ $t("LABELS.canceled") }}</p>
        </div>
        <div
          class="flex items-center gap-2 text-lg font-semibold text-[#52B788]"
          v-else-if="items.status == 'completed'"
        >
          <Icon name="fluent:box-checkmark-20-regular" class="size-6" />
          {{ $t("TITLES.Completed") }}
        </div>
        <button
          @click.stop="cancelReasonModal = true"
          class="text-lg cursor-pointer text-error disabled:text-error disabled:opacity-20"
          v-else
          :disabled="items.status != 'pending'"
        >
          {{ $t("TITLES.Cancel Booking") }}
        </button>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between rounded-lg bg-white p-3">
      <div class="flex flex-wrap items-center gap-3">
        <div>
          <img
            :src="items.store?.image"
            alt="map"
            class="h-14 w-16.5 rounded object-cover"
          />
        </div>
        <div>
          <h3 class="font-semibold">
            {{ items.store?.name }}
          </h3>
          <p class="text-black">
            {{ items.store?.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      
        <div class="space-y-2">
        <h2 class="flex items-center gap-2 text-xl font-semibold">
           <Icon name="mdi:phone" class="size-5 text-third" />
          {{ $t("TITLES.Call Center") }}
        </h2>
        <div class="rounded-lg bg-white px-2 py-4 md:px-6">
          <div
            class="flex min-h-12.5 flex-wrap items-center justify-between text-third"
          >
            <ul class="w-full space-y-3" v-if="appStore.settingsData">
              <li
                class="flex flex-wrap items-center justify-between"
                v-for="phone in appStore.settingsData.contact_us?.phone_number"
                :key="phone.id"
              >
                <div class="flex items-center gap-2 text-third">
                  <img
                    :src="phone.flag"
                    alt="flag"
                    class="h-4.5 w-5 rounded-sm object-cover"
                  />
                  <a :href="`tel:${phone.phone}`" class="text-sub">
                    +{{ phone.phone_code }} - {{ phone.phone }}
                  </a>
                </div>
                <div>
                  <a :href="`tel:${phone.phone_code + phone.phone}`">
                    <div
                      class="flex size-8 items-center justify-center rounded-full bg-primary"
                    >
                                    <Icon name="mdi:phone" class="size-4" />

                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <h2 class="text-lg font-semibold capitalize">
          {{ $t("LABELS.name") }}
        </h2>
        <div
          class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-3">
            <p class="font-medium capitalize">{{ items.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <div class="space-y-2" v-if="items.pay_type">
          <h2 class="flex items-center gap-2 text-lg font-semibold">
            {{ $t("TITLES.Payment Type") }}
          </h2>
          <div
            class="flex h-fit min-h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
          >
            <div
              class="flex flex-wrap items-center gap-3 font-medium"
              v-if="items.pay_type"
            >
              <div
                class="flex flex-wrap gap-2"
                v-for="(i, index) in items.pay_type"
                :key="index"
              >
                <Icon name="vaadin:cash" v-if="Object.keys(i)[0] == 'cash'" />
                <Icon name="famicons:card" v-else-if="Object.keys(i)[0] == 'credit'" />
                <Icon name="system-uicons:coins" v-else />
                {{ $t(`TITLES.${Object.keys(i)[0]}`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2" :class="items.pay_type ? '' : 'col-span-2'">
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          {{ $t("TITLES.Number of Persons") }}
        </h2>
        <div
          class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-3">
            <p class="font-medium capitalize">
              {{ items.guests_number }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-lg font-semibold capitalize">
        {{ $t("TITLES.Date of booking") }}
      </h2>
      <div
        class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
      >
        <div class="flex flex-wrap items-center gap-3">
          <div class="stroke-text-third">
            <Icon name="mdi:calendar" class="size-6 text-placeholder" />
          </div>
          <p class="font-medium">{{ items.date }}</p>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-lg font-semibold capitalize">
        {{ $t("TITLES.Time of booking") }}
      </h2>
      <div class="grid gap-x-4 gap-y-3 md:grid-cols-2">
        <div
          class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-3">
            <p class="font-medium">
              <span class="me-1 capitalize text-third">{{ $t("LABELS.from") }}</span>
              {{ items.from_time }}
            </p>
          </div>
          <div class="stroke-text-black">
            <Icon name="mdi:clock-outline" class="size-5 text-placeholder" />
          </div>
        </div>
        <div
          class="flex h-20 flex-wrap items-center justify-between rounded-lg bg-white px-2 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-3">
            <p class="font-medium">
              <span class="me-1 capitalize text-third">{{ $t("LABELS.to") }}</span>
              {{ items.to_time }}
            </p>
          </div>
          <div class="stroke-text-third">
            <Icon name="mdi:clock-outline" class="size-5 text-placeholder" />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="!items.is_paid && items.status != 'cancelled'"
      type="button"
      @click="emit('onlinePay', items.id)"
      class="base-btn float-right capitalize"
      :loading="loading"
    >
      {{ $t("BUTTONS.pay now") }}
    </button>
  </div>
  <general-confirm
    v-if="confirmModal"
    :title="$t('BUTTONS.cancelReservation')"
    :desc="$t('TITLES.cancelOrdersDesc')"
    :confirm-btn="$t('BUTTONS.yesCancel')"
    @close="confirmModal = false"
    @confirm="cancelOrder(items.id)"
  />

  <teleport to="body">
    <general-modal
      :persist="true"
      classes="!w-full md:!max-w-200"
      titleClasses="!text-2xl"
      @close="cancelReasonModal = false"
      v-if="cancelReasonModal"
      :title="t('TITLES.Select Your Reason')"
    >

        <CheckoutCancelReasonForm :isReservation="true" :reservation-id="items.id" @reload="updateData" />
   
    </general-modal>
  </teleport>

  <teleport to="body">
    <CreditModal v-model="showCardModal" @select="showSuccessModal" />
  </teleport>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useAppStore } from "~/store/app";
import { useToast } from "vue-toastification";
const { $api } = useNuxtApp();
const appStore = useAppStore();
const toast = useToast();
const i18n = useI18n();
const { t } = useI18n();
const showCardModal = ref(false);
const confirmModal = ref(false);
const cancelReasonModal = ref(false);
const loading = ref(false);
const successModal = ref(false);
const openCancelOrderModal = ref(false);

const emit = defineEmits(["reload", "onlinePay"]);

const props = defineProps({
  items: {
    required: false,
  },
  loading: {
    required: false,
    default: false,
  },
});

function showSuccessModal() {
  successModal.value = true;
  showCardModal.value = false;
}

function updateData(values) {
  emit("reload", values);
  cancelReasonModal.value = false;
}

function cancelOrder(id) {
  if (!id) {
    toast.error("Order ID is missing");
    return;
  }
  loading.value = true;

  $api
    .patch(`/reservations/${id}/cancel`)
    .then((res) => {
      confirmModal.value = false;
      loading.value = false;
      toast.success(res.data.message);
      emit("reload");
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e.response.data.message);
    });
}
</script>

<style lang="scss"></style>

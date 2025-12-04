<template>
  <div class="lg:col-span-3 px-10 space-y-10">
    <h2 class="text-xl font-bold">{{ $t("TITLES.typesOfOrder") }}</h2>
    <div class="flex gap-6 w-full">
      <RadioBox
        label="Delivery"
        icon="hugeicons:delivery-truck-02"
        name="orderType"
        value="delivery"
        v-model="orderTypeLocal"
      />

      <RadioBox
        label="Takeaway"
        icon="icon-park-outline:express-delivery"
        name="orderType"
        value="takeaway"
        v-model="orderTypeLocal"
      />
    </div>

    <div v-if="orderTypeLocal === 'delivery'" class="space-y-4">
      <h5 class="text-xl font-bold">{{ $t("TITLES.yourShippingAddress") }}</h5>

      <div class="flex items-center gap-4 p-2 bg-white">
        <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

        <div class="flex flex-col gap-4 p-2 justify-between">
          <p class="text-base font-semibold">
            {{ selectedAddress?.title ?? selectedAddress?.name ?? $t("TITLES.shippingAddressPlaceholder") }}
          </p>
          <p class="text-sm text-placeholder">
            {{
              selectedAddress?.location_description ??
              selectedAddress?.desc ??
              $t("TITLES.defaultAddress")
            }}
          </p>
        </div>

        <button
          @click="$emit('open-delivery-modal')"
          class="ml-auto cursor-pointer text-subtitle hover:text-black"
        >
          <Icon name="mynaui:edit-one" class="size-6" />
        </button>
      </div>
    </div>

    <div v-else>
      <h5 class="text-xl font-bold">{{ $t("TITLES.branch") }}</h5>

      <div class="flex items-center gap-4 p-2 bg-white">
        <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

        <div class="flex flex-col gap-4 p-2 justify-between">
          <p class="text-base font-semibold">
            {{ selectedBranch?.name ?? $t("TITLES.selectBranch") }}
          </p>
          <p class="text-sm text-placeholder">
            {{
              selectedBranch?.location_description ??
              selectedBranch?.address ??
              $t(".TITLES.defaultAddress")
            }}
          </p>
        </div>

        <button
          @click="$emit('open-branch-modal')"
          class="ml-auto cursor-pointer text-placeholder hover:text-black"
        >
          <Icon name="fe:arrow-down" class="size-6" />
        </button>
      </div>
    </div>

    <div>
      <div class="flex gap-5 w-full">
        <RadioBox
        :orderTime="true"
          label="Schedule Order"
          icon=""
          name="schedule"
          value="schedule"
          v-model="scheduleLocal"
        />
        <RadioBox
          icon=""
           :orderTime="true"
          label="Order Now"
          name="schedule"
          value="now"
          v-model="scheduleLocal"
        />
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
        v-if="scheduleLocal === 'schedule'"
      >
        <inputsDatePicker name="date" placeholder="date" :checkout="true" />
        <inputsTimePicker name="timeTo" placeholder="time" :checkout="true" />
      </div>
    </div>

    <h6 class="text-xl font-bold">{{ $t("TITLES.paymentMethods") }}</h6>

    <div class="flex gap-6">
      <RadioBox
        icon="famicons:card"
        label="Card"
        name="paymentType"
        value="card"
        v-model="paymentLocal"
      />

      <RadioBox label="Cash" name="paymentType" icon="icon-park-outline:wallet" value="cash" v-model="paymentLocal" />
    </div>

    <div class="flex">
      <button
        @click="$emit('confirm')"
        :disabled="submitting"
        class="w-1/2 h-14 bg-primary text-white text-lg font-semibold rounded-full mt-4 shadow-md hover:opacity-90 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="!submitting">{{ $t("TITLES.confirm") }}</span>
        <span v-else>{{ $t("TITLES.processing") }}</span>
      </button>
    </div>
  </div>
</template>
<script setup>
const {t}= useI18n();
const props = defineProps({
  orderType: String,
  schedule: String,
  paymentType: String,
  selectedBranch: Object,
  selectedAddress: Object,
  submitting: Boolean,
});

const emits = defineEmits([
  "update:orderType",
  "update:schedule",
  "update:paymentType",
  "open-delivery-modal",
  "open-branch-modal",
  "confirm",
]);

const orderTypeLocal = computed({
  get: () => props.orderType,
  set: (val) => emits("update:orderType", val),
});

const scheduleLocal = computed({
  get: () => props.schedule,
  set: (val) => emits("update:schedule", val),
});

const paymentLocal = computed({
  get: () => props.paymentType,
  set: (val) => emits("update:paymentType", val),
});
</script>

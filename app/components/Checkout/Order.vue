<template>
  <div class="lg:col-span-3 px-10 space-y-5">
    <h2 class="text-xl font-bold">Types of Order</h2>

    <div class="flex gap-6 w-full">
      <RadioBox
        label="Delivery"
        icon="mage:delivery-truck"
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
      <h5 class="text-xl font-bold">Your Shipping Address</h5>

      <div class="flex items-center gap-4 p-2 bg-white">
        <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

        <div class="flex flex-col gap-4 p-2 justify-between">
          <p class="text-base font-semibold">
            {{ selectedAddress?.title ?? selectedAddress?.name ?? "Shipping Address" }}
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
          @click="$emit('open-delivery-modal')"
          class="ml-auto cursor-pointer text-subtitle hover:text-black"
        >
          <Icon name="mynaui:edit-one" class="w-6 h-6" />
        </button>
      </div>
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
          @click="$emit('open-branch-modal')"
          class="ml-auto cursor-pointer text-placeholder hover:text-black"
        >
          <Icon name="fe:arrow-down" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div>
      <div class="flex items-center gap-6">
        <RadioBox
          label="Schedule Order"
          name="schedule"
          value="schedule"
          v-model="scheduleLocal"
        />
        <RadioBox
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

    <h6 class="text-xl font-bold">Payment methods</h6>

    <div class="flex gap-6">
      <RadioBox
        label="Card"
        name="paymentType"
        value="card"
        v-model="paymentLocal"
      />

      <RadioBox
        label="Cash"
        name="paymentType"
        value="cash"
        v-model="paymentLocal"
      />
    </div>

    <div class="flex">
      <button
        @click="$emit('confirm')"
        :disabled="submitting"
        class="w-1/2 h-14 bg-btn text-white text-lg font-semibold rounded-full mt-4 shadow-md hover:opacity-90 ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="!submitting">Confirm</span>
        <span v-else>Placing...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  submitting: Boolean,
  orderType: String,
  selectedBranch: Object,
  selectedAddress: Object,
  schedule: String,
  paymentType: String,
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

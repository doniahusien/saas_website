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

        <div v-if="orderType === 'delivery'" class="space-y-4 ">
          <h5 class="text-xl font-bold">Your Shipping Address</h5>
          <div class="flex items-center gap-4 p-2 bg-white">
            <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

            <div class="flex flex-col gap-4 p-2 justify-between">
              <p class="text-base font-semibold">Shipping Address</p>
              <p class="text-sm text-placeholder">
                Abu Al Feda, Zamalek, Cairo Governorate 4271110
              </p>
            </div>
            <button @click="openDeliveryAddressModal = true" class="ml-auto cursor-pointer text-subtitle hover:text-black">
              <Icon name="mynaui:edit-one" class="w-6 h-6" />
            </button>
          </div>
          <ModalDeliveryAddressModal v-model="openDeliveryAddressModal" />
        </div>
        <div v-else>
          <h5 class="text-xl font-bold">Branch</h5>
          <div class="flex items-center gap-4 p-2 bg-white">
            <img src="/images/download.webp" class="w-16 h-14 rounded-lg" />

            <div class="flex flex-col gap-4 p-2 justify-between">
              <p class="text-base font-semibold">Dubai Branch</p>
              <p class="text-sm text-placeholder">
                Abu Al Feda, Zamalek, Cairo Governorate 4271110
              </p>
            </div>
            <button @click="openAddressModal = true" class="ml-auto cursor-pointer text-placeholder hover:text-black">
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
            v-if="selectedSchedule === 'schedule'">
            <inputsDatePicker name="date" placeholder="date" :checkout="true"/>
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
        </div>
        <ModalCreditModal v-model="openCreditModal" />

        <div class="flex">
          <button
            class="w-1/2 h-14 bg-btn text-white text-lg font-semibold rounded-full mt-4 shadow-md hover:opacity-90 ml-auto"
          >
            Confirm
          </button>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-5 p-5 rounded-3xl bg-white">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold">Items</h3>
          <button class="cursor-pointer text-red-500 text-sm font-medium">
            Cancel Order
          </button>
        </div>

        <ItemCard
          name="Shredded Brussels Sprout"
          desc="Cheese Empanadas, confit & roaste"
          price="45.00"
          img="/images/food1.png"
        />
        <ItemCard
          name="Shredded Brussels Sprout"
          desc="Cheese Empanadas, confit & roasted"
          price="45.00"
          img="/images/food2.png"
        />

        <h4 class="text-xl font-bold">Promo Code</h4>
        <PromoInput placeholder="Enter Promo Code" icon="bxs:offer" />
        <PromoInput placeholder="Add Loyalty Amount" icon="lucide-lab:coins-stack" />

        <p class="text-base text-gold mt-2">Total Amount : 500 Points / 100 EGP</p>

        <Summary />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const orderType = ref("delivery");
const paymentType = ref("card");
const selectedSchedule = ref("now");
const takeway = ref(false);
const openAddressModal = ref<boolean>(false);
const openDeliveryAddressModal= ref<boolean>(false);
const selectedBranch = ref<Branch | null>(null);
const openCreditModal = ref<boolean>(true);
const handleBranchSelect = (branch: Branch) => {
  selectedBranch.value = branch;
  openAddressModal.value = false;
};

const handleAddressSelect = (address) => {
  openDeliveryAddressModal.value = false;
};

watch(paymentType, (val) => {
  if (val === 'card') {
    openCreditModal.value = true;
  }
});
</script>

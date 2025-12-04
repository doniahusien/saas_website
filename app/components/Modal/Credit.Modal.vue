<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div
      class="bg-semi-white rounded-2xl flex flex-col overflow-hidden p-6 relative w-full md:w-1/3 h-auto mx-4"
    >
      <button
        class="absolute top-8 right-6 text-black"
        @click="$emit('update:modelValue', false)"
      >
        <Icon name="mdi:close" class="cursor-pointer w-6 h-6" />
      </button>

      <h2 class="text-3xl font-bold mb-6">Credit Card</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-lg font-semibold mb-1">Choose Your Payment Method</label>
          <div class="relative">
            <select v-model="selectedPayment" class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm appearance-none">
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
              <option value="saved_card_1">Saved Card •••• 1234</option>
            </select>
            <span class="absolute inset-y-0 right-4 flex items-center pointer-events-none">▾</span>
          </div>
        </div>

        <div>
          <label class="block text-lg font-semibold mb-1">Card Number</label>
          <input
            type="text"
            placeholder="Enter your card number"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>

        <div>
          <label class="block text-lg font-semibold mb-1">Card Holder name</label>
          <input
            type="text"
            placeholder="Enter Card Holder name"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-lg font-semibold mb-1">Expiry date</label>
            <input
              type="text"
              placeholder="Expiry date"
              class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
            />
          </div>

          <div class="flex-1">
            <label class="block text-lg font-semibold mb-1">CVV</label>
            <input
              type="text"
              placeholder="CVV"
              class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
            />
          </div>
        </div>

        <div class="mt-4">
          <button
            @click="saveAddress"
            class="w-full cursor-pointer bg-primary text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade-up">
    <div
      v-if="showSuccess"
      class="absolute inset-0 z-40 flex items-end bg-black/60 backdrop-blur-xs rounded-2xl"
    >
      <div
        class="w-full flex flex-col justify-end bg-white rounded-2xl h-50 shadow-xl p-6 text-center z-50"
      >
        <h2 class="text-2xl font-bold">Con-Grates</h2>
        <p class="text-gray-500 text-sm mt-1">Your Address Has Been Added Successfully</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "select"]);

const showSuccess = ref(false);
const selectedPayment = ref("");

const saveAddress = () => {
  // emit the selected payment method (if any)
  emit("select", selectedPayment.value);

  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.35s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<template>
  <div
    class="bg-semi-white rounded-2xl flex flex-col overflow-hidden  p-6 relative w-full md:w-1/3 h-auto mx-4"
  >
    <button class="absolute top-8 right-5 text-black">
      <Icon name="mdi:close" class="cursor-pointer w-7 h-7" />
    </button>

    <h2 class="text-3xl font-bold mb-6">Add new address</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-lg font-semibold mb-1">Title</label>
        <input
          type="text"
          placeholder="Home2"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>

      <div>
        <label class="block text-lg font-semibold mb-1">Address</label>
        <input
          type="text"
          placeholder="Enter Your Address Here"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>

      <div>
        <label class="block text-lg font-semibold mb-1">Building No.</label>
        <input
          type="text"
          placeholder="Enter Your Building No. Here"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <label class="block text-lg font-semibold mb-1">Floor No.</label>
          <input
            type="text"
            placeholder="Enter Your Floor No. Here"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>

        <div class="flex-1">
          <label class="block text-lg font-semibold mb-1">Apartment No.</label>
          <input
            type="text"
            placeholder="Enter Your Apartment No. Here"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="saveAddress"
          class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
        >
          Save
        </button>
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const showSuccess = ref(false);

const saveAddress = () => {
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 6000);
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

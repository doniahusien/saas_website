<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 mx-4"
      >
        <div class="w-full h-52 bg-gray-100 rounded-xl mb-6"></div>

        <h2 class="text-2xl font-bold text-center">Thank You For Choosing Us</h2>

        <p class="text-center text-gray-500 mt-2">
          The Order Will Be Sent To Your Address You Entered
        </p>

        <button
          class="w-full mt-8 bg-indigo-500 text-white text-lg font-semibold py-3 rounded-full"
          @click="goToDetails"
        >
          Order Details
        </button>

        <button
          class="w-full mt-4 border border-indigo-500 text-indigo-500 text-lg font-semibold py-3 rounded-full"
          @click="goHome"
        >
          Back To Home
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  orderId: Number,
});

const emit = defineEmits(["update:show"]);

const router = useRouter();

const goToDetails = () => {
  router.push(`/orders/${props.orderId}`);
  emit("update:show", false);
};

const goHome = () => {
  router.push("/");
  emit("update:show", false);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

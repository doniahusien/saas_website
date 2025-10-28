<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 z-[9999] text-center px-6"
  >
    <div class="flex flex-col items-center space-y-8 animate-fadeIn">
      <h3 class="font-extrabold text-3xl md:text-4xl text-gray-900 drop-shadow-sm">
        {{ t("TITLES.No internet connection") }}
      </h3>

      <!-- <img
        src="/connection.png"
        alt="No connection"
        class="w-60 h-60 object-contain opacity-90 animate-bounce-slow"
      /> -->

      <button
        @click="reload"
        class="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
      >
        {{ t("BUTTONS.try again") }}
      </button>

      <p class="text-sm text-gray-600 mt-4">
        {{ t("TITLES.Please check your internet connection and try again.") }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

function reload() {
  location.reload()
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-in-out;
}
</style>

<template>
  <div class="relative stepper-wrapper py-5">
    <div class="flex items-center w-full relative z-10">
      <div
        v-for="(status, index) in orderData.order_status"
        :key="status.key"
        class="flex items-center flex-1 relative"
      >
        <div class="flex flex-col items-center flex-1 z-10">
          <div
            class="stepper-dot w-5 h-5 rounded-full flex items-center justify-center mb-3 shadow-sm transition-all transform"
            :class="
              status.status === 'in_progress'
                ? 'bg-blue-600 text-white scale-110'
                : status.status === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-300 border border-gray-100'
            "
          >
            <Icon
              v-if="status.status === 'completed' || status.status === 'in_progress'"
              name="mdi:check"
              class="w-4 h-4"
            />
            <Icon v-else name="mdi:check" class="w-2 h-2 p-2 text-gray-200" />
          </div>
          <span
            class="text-sm font-semibold text-center"
            :class="
              status.status === 'in_progress' || status.status === 'completed'
                ? 'text-blue-600'
                : 'text-gray-300'
            "
          >
            {{ status.value }}
          </span>
        </div>

        <div
          v-if="index < orderData.order_status.length - 1"
          class="stepper-segment h-0.5 flex-1 -mt-5 rounded-full transition-all"
          :class="
            status.status === 'completed' || status.status === 'in_progress'
              ? 'bg-blue-600'
              : 'bg-gray-200'
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  orderData: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.stepper-wrapper > .absolute {
  z-index: 0;
}

.stepper-dot {
  z-index: 10;
  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.06);
}

.stepper-segment {
  min-width: 2px;
  height: 2px;
}

.stepper-dot .mdi\:check {
  opacity: 0.9;
}
</style>

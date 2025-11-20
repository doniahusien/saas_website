<template>
         <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <Icon name="mdi:phone" class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-gray-800">Call Center</h3>
          </div>
        
          <div class="flex flex-col gap-5 p-5 rounded-2xl bg-white border border-gray-100">
            <p class="text-red-500 text-sm " v-if="orderData.call_center_message">
              *{{ orderData.call_center_message }}
            </p>
            <div
              class="flex items-center justify-between "
            >
              <div class="flex items-center gap-3 flex-1">
                <div>
                  <div class="text-sm text-placeholder font-medium">
                    {{ orderData.call_center }}
                  </div>
                </div>
              </div>

              <a
                :href="`tel:${orderData.call_center}`"
                class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition"
              >
                <Icon name="mdi:phone" class="w-4 h-4" />
              </a>
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
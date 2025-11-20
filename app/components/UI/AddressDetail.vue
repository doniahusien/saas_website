<template>

      <div>
            <div class="flex items-center gap-3 mb-3">
              <Icon name="bx:map" class="w-6 h-6 text-black" />
              <h3 class="text-lg font-bold text-gray-800">Branch</h3>
            </div>

            <div class="flex items-start bg-white p-3 rounded-2xl gap-3">
              <div class="w-16 h-12 overflow-hiddenshrink-0">
                <img
                  v-if="orderData.store.image"
                  :src="orderData.store.image"
                  alt="map thumbnail"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400"
                >
                  map
                </div>
              </div>

              <div>
                <div class="font-semibold text-lg text-black">
                  {{ orderData.store?.complete_name || "No address available" }}
                </div>
                <div class="text-base mt-1 text-placeholder">
                  {{
                    orderData.address?.location_description ||
                    orderData.store?.location_description
                  }}
                </div>
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
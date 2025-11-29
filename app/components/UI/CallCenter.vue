<template>
         <div class="flex items-center gap-3 mb-3">
            <div class="size10 rounded-lg flex items-center justify-center">
              <Icon name="mdi:phone" class="size-5" />
            </div>
            <h3 class="text-xl font-bold text-gray-800">{{$t('TITLES.Call center')}}</h3>
          </div>
        
          <div class="flex flex-col gap-5 p-7 rounded-2xl bg-white border border-gray-100">
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
                class="size-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition"
              >
                <Icon name="mdi:phone" class="size-5" />
              </a>
            </div>
          </div>
</template>
<script setup>
const {t} = useI18n()
defineProps({
  orderData: {
    type: Object,
    required: true,
  },
});
</script>
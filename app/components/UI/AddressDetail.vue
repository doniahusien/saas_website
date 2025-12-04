<template>
  <div>
    <div class="flex items-center gap-3 mb-3">
      <Icon name="bx:map" class="size-6 text-third" />
      <h3 class="text-2xl font-semibold">
        {{
          orderData.order_type == "delivery"
            ? $t("TITLES.shippingAddressPlaceholder")
            : $t("TITLES.branch")
        }}
      </h3>
    </div>

    <div class="flex items-start bg-website-white p-4 rounded-xl gap-3">
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
        <div class="font-semibold text-lg ">
          {{ orderData.order_type == "delivery"? orderData.address?.title: orderData.store?.complete_name }}
        </div>
        <div class="text-base mt-1 text-third">
          {{
             orderData.order_type == "delivery"?
            orderData.address?.desc :
            orderData.store?.location_description
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
defineProps({
  orderData: {
    type: Object,
    required: true,
  },
});
</script>

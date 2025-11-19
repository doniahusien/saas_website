<template>
  <div>
    <div v-if="price && Object.keys(price).length" class="bg-white rounded-2xl mt-auto space-y-6">
    <div>
      <h2 class="text-xl font-bold">
        {{ t("cart.orderSum") }}
      </h2>
    </div>

    <div class="flex justify-between text-gray-700">
      <span>{{ t("cart.subtotal") }} (2 {{ t("cart.items") }})</span>
      <span class="font-semibold"
        >{{ price.sun_total }}<span class="text-xs">{{ currency }}</span></span
      >
    </div>

    <div class="flex justify-between text-gray-700">
      <span>{{ t("cart.shipping") }}</span>
      <span class="font-semibold"
        >{{ price.delivery_price }}<span class="text-xs">{{ currency }}</span></span
      >
    </div>

    <div class="flex justify-between text-gray-700">
      <span>{{ t("cart.discount") }}</span>
      <span class="font-semibold"
        >{{ price.tax_rate_value }}<span class="text-xs">{{ currency }}</span></span
      >
    </div>

    <div class="flex justify-between text-black text-lg font-bold">
      <span>{{ t("cart.totalAmount") }}</span>
      <span
        >{{ price.total }}<span class="text-xs">{{ currency }}</span></span
      >
    </div>
    </div>

    <div v-else class="bg-white rounded-2xl mt-auto p-6 text-center text-secondary">
      <p class="font-semibold">No order summary</p>
    </div>
  </div>
</template>

<script setup>
const {t}= useI18n()
defineProps({
    price:Object,
    currency:String
})
</script>
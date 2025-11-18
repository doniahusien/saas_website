<template>
  <div class="bg-white rounded-2xl mt-auto space-y-6">
    <div>
      <h2 class="text-xl font-bold">
        {{ t("cart.orderSum") }}
      </h2>
    </div>

    <div class="border space-y-4 border-light-gray rounded-2xl p-3 ">
      <div class="flex justify-between font-semibold text-gray-700">
        <span>{{ t("cart.subtotal") }} (2 {{ t("cart.items") }})</span>
        <span
          >155<span class="text-xs"> LE</span></span
        >
      </div>

      <div class="flex justify-between font-semibold text-gray-700">
        <span>{{ t("cart.shipping") }}</span>
        <span
          >200<span class="text-xs">LE</span></span
        >
      </div>

      <div class="flex justify-between font-semibold text-gray-700">
        <span>{{ t("cart.discount") }}</span>
        <span 
          >180<span class="text-xs">LE</span></span
        >
      </div>

      <div class="flex justify-between pt-4 border-t border-t-light-gray text-black text-lg font-bold">
        <span>{{ t("cart.totalAmount") }}</span>
        <span
          >500<span class="text-xs">LE</span></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

</script>

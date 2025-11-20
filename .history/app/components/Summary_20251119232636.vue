<template>
  <div class="bg-white rounded-2xl mt-auto space-y-6">
    <div>
      <h2 class="text-xl font-bold">
        {{ t("cart.orderSum") }}
      </h2>
    </div>

    <div class="border space-y-4 border-light-gray rounded-2xl p-3 ">
      <div class="flex justify-between font-semibold text-gray-700">
        <span>{{ t("cart.subtotal") }} ({{ itemCount || 2 }} {{ t("cart.items") }})</span>
        <span>
          {{ subtotal || 155 }}<span class="text-xs"> {{ currency || "LE" }}</span>
        </span>
      </div>

      <div class="flex justify-between font-semibold text-gray-700">
        <span>{{ t("cart.shipping") }}</span>
        <span>
          {{ shipping || 200 }}<span class="text-xs">{{ currency || "LE" }}</span>
        </span>
      </div>

      <div 
        v-if="discount > 0"
        class="flex justify-between font-semibold text-gray-700"
      >
        <span>{{ t("cart.discount") }}</span>
        <span class="text-green-600">
          -{{ discount }}<span class="text-xs">{{ currency || "LE" }}</span>
        </span>
      </div>

      <div 
        v-if="tax > 0"
        class="flex justify-between font-semibold text-gray-700"
      >
        <span>Tax{{ taxPercentage ? ` (${taxPercentage}%)` : '' }}</span>
        <span>
          {{ tax }}<span class="text-xs">{{ currency || "LE" }}</span>
        </span>
      </div>

      <div 
        v-if="surcharge > 0"
        class="flex justify-between font-semibold text-gray-700"
      >
        <span>Surcharge</span>
        <span>
          {{ surcharge }}<span class="text-xs">{{ currency || "LE" }}</span>
        </span>
      </div>

      <div class="flex justify-between pt-4 border-t border-t-light-gray text-black text-lg font-bold">
        <span>{{ t("cart.totalAmount") }}</span>
        <span>
          {{ total || 500 }}<span class="text-xs">{{ currency || "LE" }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

defineProps({
  itemCount: {
    type: Number,
    default: 2
  },
  subtotal: {
    type: [Number, String],
    default: 155
  },
  shipping: {
    type: [Number, String],
    default: 200
  },
  discount: {
    type: [Number, String],
    default: 0
  },
  tax: {
    type: [Number, String],
    default: 0
  },
  taxPercentage: {
    type: [Number, String],
    default: null
  },
  surcharge: {
    type: [Number, String],
    default: 0
  },
  total: {
    type: [Number, String],
    default: 500
  },
  currency: {
    type: String,
    default: "LE"
  }
});

</script>

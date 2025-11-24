<template>
  <div>
    <div
      v-if="price"
      class="bg-white rounded-2xl pt-5 mt-auto space-y-6"
    >
      <h2 class="text-xl font-bold">
        {{ t("cart.orderSum") }}
      </h2>

      <div
        v-for="(row, index) in summaryRows"
        :key="index"
        class="flex justify-between text-black"
      >
        <span>
          {{ t(row.title) }}
         <!--  <span v-if="row.showCount" class="text-sm text-third">
            ({{ itemCount }} {{ t("cart.items") }})
          </span> -->
        </span>

        <span class="font-semibold text-xl">
          {{ formatNumber(row.value) }}
          <span class="text-xs">{{ currency }}</span>
        </span>
      </div>

      <div class="flex justify-between text-black text-lg font-bold">
        <span>{{ t("cart.totalAmount") }}</span>
        <span>
          {{ formatNumber(price.total) }}
          <span class="text-xs">{{ currency }}</span>
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  price: Object,     
  currency: String,  
  itemCount: Number   
});

function formatNumber(num) {
  return Number(num).toFixed(2).replace(/\.00$/, "");
}

const summaryRows = computed(() => [
  {
    title: "cart.subtotal",
    value: props.price?.sun_total || 0,
    showCount: true
  },
/*   {
    title: "cart.shipping",
    value: props.price?.delivery_price || 0
  }, */
  {
    title: "cart.surcharge",
    value: props.price?.surcharge || 0
  },
/*   {
    title: "cart.discount",
    value: props.price?.coupon_price || 0
  }, */
  {
    title: "cart.VAT",
    value: props.price?.tax_rate_value || 0
  }
]);
</script>

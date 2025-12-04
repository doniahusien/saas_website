<template>
  <div>
    <div
      v-if="price"
      class="bg-website-white border border-line rounded-2xl py-3 px-3 mt-auto space-y-5"
    >

      <div
        v-for="(row, index) in summaryRows"
        :key="index"
        class="flex justify-between text-xl text-black"
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

      <div class="flex justify-between text-black text-xl ">
        <span>{{ t("cart.totalAmount") }}</span>
        <span>
          {{ formatNumber(price.total|| price.total_price) }}
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
    value: props.price?.sun_total ||props.price.total_item_price_before_discount|| 0,
    showCount: true
  },
  {
    title: "cart.shipping",
    value: props.price?.delivery_price 
  }, 
  {
    title: "cart.surcharge",
    value: props.price?.surcharge ||props.price.surcharge_value||  0
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

<template>
  <transition name="slide">
    <menusSideMenu
    @close="emit('close')"
    :title="$t('cart.title')"
  >   
      <CartItems
        :localProducts="carts.products"
        :removeFromCart="removeFromCart"
        :updateQty="updateQty"
      />

      <div class="mt-auto space-y-4" v-if="carts.products">
       <h2 class="text-2xl font-bold">
        {{ t("cart.orderSum") }}
      </h2>
        <CartOrderSummary :price="price" :currency="currency" />
        <NuxtLink
          :to="localePath('/checkout')"
          class="w-full cursor-pointer bg-btn text-white gap-2 py-4 rounded-full font-semibold flex items-center justify-center"
        >
          {{ t("cart.checkout") }}
          <span class="size-4 flex justify-center items-center bg-white rounded-full"
            ><Icon  :name="isRTL ? 'mdi:arrow-left' : 'mdi:arrow-right'" class="size-3 text-btn"
          /></span>
        </NuxtLink>
      </div>
    </menusSideMenu>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const localePath = useLocalePath();
const { t,locale } = useI18n();
const emit = defineEmits(["close"]);
const carts = computed(() => appStore.getCartData);
const price= computed(() => appStore.getCartPrice);
const currency = computed(() => appStore.getCartCurrency);
/* const { localProducts, price, currency } = useCartMapper(carts); */

const isRTL = computed(() => locale.value === "ar");

async function removeFromCart(id) {
  await appStore.removeFromCart(id);
}

const updateQty = (item, type) => {
  appStore.updateCounter(item.id, item.quantity, type);
};
</script>

<style scoped>

</style>

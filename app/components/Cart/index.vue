<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
      @click.self="close"
    ></div>
  </transition>

  <transition name="slide">
    <div
      v-if="modelValue"
      class="fixed top-0 end-0 w-full md:w-1/2 lg:w-1/3 h-full bg-white z-80 px-4 py-10 flex flex-col rounded-s-0 md:rounded-s-3xl"
    >
      <div class="flex justify-between mb-5">
        <h2 class="text-4xl font-bold">
          {{ t("cart.title") }} <span class="text-sm text-btn">( {{ carts.item_count || 0}} {{ t("cart.items") }} )</span>
        </h2>

        <button
          @click="close"
          class="text-black font-bold cursor-pointer text-4xl"
        >
          <Icon name="fe:close" />
        </button>
      </div>

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
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const localePath = useLocalePath();
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const { t,locale } = useI18n();
const close = () => emit("update:modelValue", false);
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>

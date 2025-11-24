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
      class="fixed top-0 end-0 w-full md:w-1/3 h-full bg-white z-80 px-5 py-10 flex flex-col"
    >
      <div class="flex justify-between mb-5">
        <h2 class="text-xl font-bold">
          {{ t("cart.title") }} <span>{{ carts.item_count }} {{ t("cart.items") }}</span>
        </h2>

        <button
          @click="close"
          class="text-gray-500 cursor-pointer hover:text-black text-2xl"
        >
          <Icon name="fe:close" />
        </button>
      </div>

      <CartItems
        :localProducts="carts.products"
        :removeFromCart="removeFromCart"
        :updateQty="updateQty"
      />

      <div class="mt-auto space-y-5">
        <CartOrderSummary :price="price" :currency="currency" />
        <NuxtLink
          :to="localePath('/checkout')"
          class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
        >
          {{ t("cart.checkout") }}
          <span class="w-4 h-4 flex justify-center items-center bg-white rounded-full"
            ><Icon name="mdi:arrow-right" class="w-3 h-3 text-btn"
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
const { t } = useI18n();
const close = () => emit("update:modelValue", false);
const carts = computed(() => appStore.getCartData);
const price= computed(() => appStore.getCartPrice);
const currency = computed(() => appStore.getCartCurrency);
/* const { localProducts, price, currency } = useCartMapper(carts); */

  
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

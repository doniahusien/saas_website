<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click.self="close"
    ></div>
  </transition>

  <transition name="slide">
    <div
      v-if="modelValue"
      class="fixed top-0 right-0 w-96 md:w-1/3 h-full bg-white z-60 p-4 flex flex-col"
    >
      <div class="flex justify-between mb-5">
        <h2 class="text-xl font-bold">
          {{ t("cart.title") }} <span>{{ cartsCount }} {{ t("cart.items") }}</span>
        </h2>

        <button
          @click="close"
          class="text-gray-500 cursor-pointer hover:text-black text-2xl"
        >
          <Icon name="fe:close" />
        </button>
      </div>

      <div
        v-for="item in localProducts"
        :key="item.id"
        class="px-2 py-4 grid justify-between grid-cols-4 gap-3"
      >
        <NuxtImg :src="item.image" class="w-32 h-30 rounded-2xl object-cover" />

        <div class="col-span-2 flex flex-col">
          <p class="font-semibold text-lg">{{ item.name }}</p>
          <p class="text-base text-secondary">
            <span v-for="sub in item.sub_modifiers" :key="sub.id">
              {{ sub.item_modifiers.map((m) => m.name).join(", ") }}
            </span>
          </p>
          <p class="font-semibold text-xl mt-auto">
            {{ item.total_price }} <span class="text-xs">EGP</span>
          </p>
        </div>

        <div class="flex flex-col items-end justify-between">
          <Icon
            name="ei:trash"
            class="text-red-500 w-6 h-6 cursor-pointer"
            @click="removeFromCart(item.id)"
          />
          <div
            class="rounded-full px-3 w-20 border border-placeholder flex justify-between items-center"
          >
            <button
              class="text-placeholder cursor-pointer"
              @click="updateQty(item, 'decrease')"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              class="text-placeholder cursor-pointer"
              @click="updateQty(item, 'increase')"
            >
              +
            </button>
          </div>
        </div>
      </div>

    <CartOrderSummary :price="price" :currency="currency"/>

      <div class="mt-6 pt-4">
        <button
          class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
        >
          {{ t("cart.checkout") }}
          <span class="w-4 h-4 flex justify-center items-center bg-white rounded-full"
            ><Icon name="mdi:arrow-right" class="w-3 h-3 text-btn"
          /></span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const appStore = useAppStore();

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const { t } = useI18n();
const close = () => emit("update:modelValue", false);
const localProducts = ref([]);
const price = ref({});
const currency = ref("LE");
const cartsCount = computed(() => appStore.getCartCount);
const carts = computed(() => appStore.getCartData);

async function removeFromCart(id) {
  await appStore.removeFromCart(id);
}

const updateQty = (item, type) => {
  appStore.updateCounter(item.id, item.quantity, type);
};

watch(
  carts,
  (newVal) => {
 /*    console.log(appStore.getCartData); */
    if (!newVal || !newVal?.data?.products || !newVal.price) {
      localProducts.value = [];

      price.value = {};

      return;
    }
    localProducts.value = newVal.data.products.map((item: any) => ({
      ...item.product,
      id: item.id,
      quantity: item.quantity,
      total_price: item.total_price,
      note: item.note,
      combo: item.combo,
      sub_modifiers: item.sub_modifiers,
    }));

    price.value = newVal.price;
    currency.value = newVal.currency;
    /* 
    console.log("Mapped products:", localProducts.value); */
  },
  { deep: true, immediate: true }
);
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

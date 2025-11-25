<template>
  <div>
    <div
      v-if="localProducts && localProducts.length > 0"
      class="overflow-y-auto branch-list"
      :class="[isCheckout ? 'h-40' : 'h-72']"
    >
      <div
        v-for="item in localProducts"
        :key="item.id"
        class="px-2 py-4 grid justify-between grid-cols-4 gap-5"
      >
        <NuxtImg
          :src="item.product.image"
          class="rounded-xl object-cover"
          :class="[isCheckout == true ? 'w-24 h-18 rounded-lg' : 'w-46 h-26']"
        />
        <div
          class="flex flex-col"
          :class="[isCheckout == true ? 'col-span-3' : 'col-span-2']"
        >
          <p class="font-semibold text-lg">{{ item.product.name }}</p>
          <p class="text-base text-secondary">
            <span v-for="sub in item.sub_modifiers" :key="sub.id">
              {{
                sub.item_modifiers
                  .map(
                    (m) =>
                      `${m.quantity}x ${m.name} (${m.price.price} ${m.price.currency})`
                  )
                  .join(", ")
              }}
            </span>
          </p>

          <p class="font-semibold text-2xl mt-auto">
            {{ item.total_price }}
            <span class="text-xs">{{ item.product.price.currency }}</span>
          </p>
        </div>

        <div class="flex flex-col items-end justify-between" v-if="isCheckout == false">
          <Icon
            name="ei:trash"
            class="text-red-500 size-6 cursor-pointer"
            @click="removeFromCart(item.id)"
          />
          <div
            class="rounded-full px-3 w-22 border border-placeholder flex justify-between items-center text-xl font-bold"
          >
            <button
              class="text-placeholder text-2xl cursor-pointer"
              @click="updateQty(item, 'decrease')"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              class="text-placeholder text-2xl cursor-pointer"
              @click="updateQty(item, 'increase')"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-col h-80 justify-center gap-5 items-center text-center text-secondary"
    >
      <p class="font-semibold text-2xl">{{ $t("cart.empty") }}</p>
      <p class="text-lg">{{ $t("cart.addItems") }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  localProducts: Array,
  removeFromCart: Function,
  updateQty: Function,
  isCheckout: Boolean,
});
</script>

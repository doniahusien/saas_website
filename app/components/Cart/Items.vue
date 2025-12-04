<template>
  <div>
    <div
      v-if="localProducts && localProducts.length > 0"
      class="overflow-y-auto space-y-5 branch-list"
      :class="[isCheckout ? 'h-85' : 'h-72']"
    >
      <div
        v-for="item in localProducts"
        :key="item.id"
        :class="isCheckout? 'border  border-line rounded-xl':''"
        class="px-5 py-3 bg-website-white grid justify-between grid-cols-3 gap-5"
      >
        <NuxtImg
          :src="item.product.image"
          class="rounded-xl object-cover"
          :class="[isCheckout == true ? 'w-26 h-22 rounded-lg' : 'w-33 h-30']"
        />
        <div
          class="flex flex-col"
          :class="[isCheckout == true ? 'col-span-2' : 'col-span-1']" >
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

          <p class="font-semibold text-3xl mt-auto">
            {{ item.total_price }}
            <span class="text-xs">{{ item.product.price.currency }}</span>
          </p>
        </div>

        <div class="flex flex-col items-end justify-between" v-if="isCheckout == false">
          <Icon
            name="ei:trash"
            class="text-warning size-6 cursor-pointer"
            @click="removeFromCart(item.id)"
          />
          <div
            class="rounded-full px-3 w-22 border border-line flex justify-between items-center text-xl font-bold"
          >
            <button
              class="text-primary text-2xl cursor-pointer"
              @click="updateQty(item, 'decrease')"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              class="text-primary text-2xl cursor-pointer"
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

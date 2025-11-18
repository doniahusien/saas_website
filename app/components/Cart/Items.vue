<template>
        <div
        v-for="item in localProducts"
        :key="item.id"
        class="px-2 py-4 grid justify-between grid-cols-4 gap-3"
      >
        <NuxtImg :src="item.image" class=" rounded-2xl object-cover" :class="[isCheckout==true?'w-24 h-18 rounded-lg':'w-32 h-28']"  />    
         <div class="flex flex-col":class="[isCheckout==true?'col-span-3':'col-span-2']" >

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

        <div class="flex flex-col items-end justify-between" v-if="isCheckout==false">
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
</template>
<script setup>
defineProps({
  localProducts: Array,
  removeFromCart: Function,
  updateQty: Function,
  isCheckout: Boolean
})
</script>
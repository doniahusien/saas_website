<template>
  <div class="p-6 space-y-8">
    <div>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        {{ $t("productOptions.size") }}
        <span class="text-sm text-amber-500 font-medium ml-2">
          {{ $t("productOptions.selectSizeNote") }}
        </span>
      </h2>

      <div class="flex flex-wrap gap-4">
        <button
          v-for="size in sizes"
          :key="size.label"
          @click="selectedSize = size.label"
          :class="[
            'px-5 py-3 rounded-xl text-sm font-medium border transition',
            selectedSize === size.label
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-gray-200 text-gray-700 hover:border-blue-400'
          ]"
        >
          {{ $t(`productOptions.${size.label.toLowerCase()}`) }}
          (+{{ size.price }} {{ $t("productOptions.currency") }})
          <p class="text-gray-500 text-xs">
            ({{ $t("productOptions.weight", { weight: size.weight }) }})
          </p>
        </button>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        {{ $t("productOptions.topping") }}
        <span class="text-sm text-amber-500 font-medium ml-2">
          {{ $t("productOptions.selectToppingNote") }}
        </span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="topping in toppings"
          :key="topping.label"
          class="flex items-center justify-between border border-gray-200 rounded-xl p-4">
          <div>
            <p class="font-medium text-gray-800">
              {{ topping.label }} (+{{ topping.price }} {{ $t("productOptions.currency") }})
            </p>
            <p class="text-xs text-gray-500">
              ({{ $t("productOptions.weight", { weight: topping.weight }) }})
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-sm"
              @click="topping.count = Math.max(0, topping.count - 1)"
            >−</button>
            <span class="text-gray-700 text-sm font-medium">{{ topping.count }}</span>
            <button
              class="cursor-pointer w-6 h-6 rounded-full bg-btn text-white text-sm"
              @click="topping.count++"
            >+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
      <div class="flex items-center gap-2">
        <button class="cursor-pointer w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-sm" @click="quantity--">−</button>
        <span class="text-gray-700 text-sm font-medium">{{ quantity }}</span>
        <button class="cursor-pointer w-7 h-7 rounded-full bg-btn text-white text-sm" @click="quantity++">+</button>
      </div>

      <button
        class="flex items-center justify-center gap-2 cursor-pointer bg-btn text-white font-semibold rounded-xl px-8 py-3 hover:bg-blue-700 transition"
      >
        <Icon name="mdi:cart-outline" class="text-lg" />
        {{ $t("productOptions.addToCart") }}
        <span class="text-sm font-medium opacity-80">
          {{ $t("productOptions.totalPrice", { price: totalPrice }) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const selectedSize = ref("")
const quantity = ref(1)

const sizes = [
  { label: "Single", price: 220, weight: "70 gm" },
  { label: "Double", price: 320, weight: "140 gm" },
  { label: "Triple", price: 400, weight: "170 gm" }
]

const toppings = ref([
  { label: "Onion", price: 20, weight: "70 gm", count: 1 },
  { label: "Pepper", price: 0, weight: "70 gm", count: 1 },
  { label: "Fries", price: 30, weight: "70 gm", count: 1 },
  { label: "Pepsi", price: 50, weight: "1 Liter", count: 1 }
])

const totalPrice = computed(() => {
  const sizePrice = sizes.find(s => s.label === selectedSize.value)?.price || 0
  const toppingsPrice = toppings.value.reduce((sum, t) => sum + t.price * t.count, 0)
  return (sizePrice + toppingsPrice) * quantity.value
})
</script>

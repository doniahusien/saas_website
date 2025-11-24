<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border">
    <h3 class="font-bold mb-4">Items</h3>

    <div class="space-y-4">
      <div v-for="item in items" :key="item.id" class="flex gap-3">
        <img :src="item.product.image" class="w-14 h-14 rounded-lg" />
        <div>
          <p class="font-semibold text-sm">{{ item.name }}</p>
          <p class="text-xs text-gray-500">{{ item.price }} EGP</p>
        </div>
      </div>
    </div>

    <div class="mt-6 border-t pt-4 text-sm">
      <div class="flex justify-between"><span>Subtotal</span><span>105 EGP</span></div>
      <div class="flex justify-between"><span>Shipping</span><span>00.00</span></div>
      <div class="flex justify-between"><span>Discount</span><span>10.00</span></div>
      <div class="flex justify-between"><span>Loyalty Card</span><span>10.00</span></div>
      <div class="border-t pt-3 mt-3 flex justify-between font-semibold text-black">
        <span>Total</span><span>550 EGP</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    id: 1,
    name: "Shredded Brussels Sprout",
    price: 45,
    image: "/images/food1.png"
  },
  {
    id: 2,
    name: "Shredded Brussels Sprout",
    price: 45,
    image: "/images/food2.png"
  }
]
</script>

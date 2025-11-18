<template>
  <div class="flex gap-4  bg-white border border-light-gray rounded-2xl p-3">
    <img :src="img" class="w-24 h-18 rounded-lg object-cover" />
    <div class ="flex flex-col">
      <p class="text-lg">{{ name }}</p>
      <p class="text-xs text-secondary">{{ desc }}</p>
      <p class="text-base font-bold mt-auto">
        {{ price }}<span class="text-xs"> EGP</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  desc: String,
  price: String,
  img: String,
});
</script>

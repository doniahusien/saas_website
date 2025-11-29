<template>
  <div
    class="my-5 "
    v-if="items"
  >
    <div class="container grid grid-cols-5">
      <div class="space-y-5 lg:col-span-3 col-span-5">
        <h2 class="font-bold text-4xl" >
          {{ items.heading }}
        </h2>
        <div v-html="items.desc" class="text-black font-thin">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    required: true,
  },
});
</script>

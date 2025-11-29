<template>
  <div class="relative z-100 rounded-xl bg-white p-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3
        v-if="title"
        class="mb-3 text-4xl font-semibold text-black lg:text-5xl"
    
      >
        {{ title }}
      </h3>
      <slot name="topTitle"></slot>
    </div>
    <slot name="title" />
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    required: false,
  },
});
</script>

<style lang="scss">

</style>

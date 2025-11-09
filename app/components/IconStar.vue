<script setup lang="ts">
defineProps<{ filled?: boolean }>()
</script>

<template>
  <svg
    class="w-5 h-5"
    :class="{ 'fill-current text-yellow-400': filled, 'text-gray-300': !filled }"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 15l-5.39 2.83 1.03-6-4.36-4.25 6.04-.88L10 1l2.68 5.7 6.04.88-4.36 4.25 1.03 6L10 15z"
      :fill="filled ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="1.5"
    />
  </svg>
</template>
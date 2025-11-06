<template>
  <div class="p-4">
    <h1>Item Page</h1>
    <p>Item ID: {{ id }}</p>
  </div>
</template>

<script setup>

const route = useRoute()
const id = route.params.id
</script>

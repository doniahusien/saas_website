<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    
    <p>{{ error.message }}</p>
    
    <NuxtLink to="/">Go back to homepage</NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 4rem 2rem;
  font-family: system-ui, sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #dc2626;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

a {
  background: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  background: #333;
}
</style>
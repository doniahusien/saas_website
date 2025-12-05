<script setup>
const pending = ref(false);
const payWithStripe = async () => {
  pending.value = true;

  const response = await $fetch("/api/create-order", {
    method: "POST",
    body: {
      product_name: "Saas Resturant",
      price: 50,
    },
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhYXMua2hsb2QuYWFpdC1kLmNvbS9NYWMvYXBpL2FwcC9hdXRoL2xvZ2luIiwiaWF0IjoxNzIyNTM5ODEyLCJleHAiOjE3MjM4MzU4MTIsIm5iZiI6MTcyMjUzOTgxMiwianRpIjoiQkhmeDdscXM3ODZ4Q2xVWSIsInN1YiI6IjEyIiwicHJ2IjoiOGIwYjQ2ZmU0M2U1YWNjMmU1NzFkYmRlNWIwODFiYzFiMjA1MGNmMiJ9.yeE_IXPYgSu_ElJFQpOlKFKhc8GlrQJifxhq0mGOvyA"
    }
  });

  pending.value = false;

  if (response.url) {
    window.location.href = response.url;
  } else {
    alert("Something went wrong");
  }
};
</script>

<template>
  <div class="container">
    <button @click="payWithStripe">Pay with Stripe</button>
  </div>
</template>

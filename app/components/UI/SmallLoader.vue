<template>
    <div class="loader-small"></div>
</template>


<style scoped>
.loader-small {
  width: 32px;
  height: 32px;
  border: 4px solid gray;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}
</style>

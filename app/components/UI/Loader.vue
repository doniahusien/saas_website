<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(0, 0, 250, 0.2);
  border-top-color: blue; 
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;
  box-shadow: 0 0 10px rgba(0, 0, 250, 0.5);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: pulse 1.6s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(63, 124, 255, 0.5);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}
</style>

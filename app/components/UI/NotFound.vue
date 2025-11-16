<template>
  <div class="m-auto bg-nav-bg pt-40  min-h-screen">
    <div class="flex justify-center text-black flex-col items-center ">
      <img
        width="400"
        height="400"
        src="/images/cuate.png"
        alt="not found icon"
        loading="lazy"
      />
      <div class="error_section">
        <h1 class="text-center font-bold text-2xl my-4">
          {{ $t("something went wrong") }}
        </h1>
        <p class="text-center max-w-[500px] text-sub">
          {{ $t("pleaseKindlyTryAgain") }}
        </p>
   
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>
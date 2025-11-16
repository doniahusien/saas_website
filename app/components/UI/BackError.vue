<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-nav-bg pt-24 px-4">
    <div class="w-full max-w-md text-center space-y-6">

      <img
        src="/images/error.png"
        alt="Error illustration"
        class="mx-auto w-48 h-48 object-contain"
      />

      <h3 class="text-3xl md:text-4xl font-extrabold text-gray-800">
        {{ $t("TITLES.Internal server error") }}
      </h3>

      <img
        src="/images/connection.png"
        alt="Connection issue"
        class="mx-auto w-32 h-32 object-contain"
      />

      <p class="text-gray-600 text-base md:text-lg">
        {{ $t("LABELS.errorDesc") }}
      </p>
    </div>
  </div>
</template>

<script setup>
const i18n = useI18n();
</script>
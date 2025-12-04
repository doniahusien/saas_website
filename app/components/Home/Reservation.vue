<template>
  
  <div class="container mx-auto space-y-10 px-6 md:px-0">
    <div class="flex items-center gap-2">
      <span class="text-primary">{{ $t("reservation.eyebrow") }}</span>
      <div class="flex-none w-22 h-px bg-primary"></div>
    </div>

    <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold">
      {{ $t("reservation.title") }}
    </h2>
  <div
    class="bg-[url('/images/bg/reservation.png')] bg-cover bg-center rounded-xl shadow-lg p-8 md:p-12"
  >
   <GeneralBookForm />
  </div>
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n();
</script>

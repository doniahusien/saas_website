<template>
  <div class="bookingForm min-h-[689px] space-y-5 pt-8">
    <h3 class="text-center font-allura text-4xl">
      {{ $t("TITLES.Reservations") }}
    </h3>
    <p class="text-center text-4xl font-extrabold">
      {{ $t("TITLES.Book a Table") }}
    </p>
    <div class="min-h-fit container">
<h1>TESETHI</h1>
    </div>

  </div>
</template>

<script setup>
const {t}= useI18n();
const emit = defineEmits(["close"]);

</script>
<template>
  <div class="bookingForm min-h-[689px] space-y-5 pt-8">
    <h3 class="text-center font-allura text-4xl">
      {{ $t("TITLES.WishList") }}
    </h3>
    <div class="min-h-fit container">
    
    </div>

  </div>
</template>

<script setup>
const {t}= useI18n();
const emit = defineEmits(["close"]);

</script>
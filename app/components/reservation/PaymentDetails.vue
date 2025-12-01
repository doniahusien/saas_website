<template>
  <div class="mt-5" v-if="items">
    <div class="min-h-20 rounded-lg bg-white">
      <h2 class="p-5 text-3xl font-bold capitalize">
        {{ $t("LABELS.Booking ID") }} - {{ items.id }}
      </h2>
      <hr class="text-line" />
      <div class="p-5">
        <p class="font-semibold">{{ $t("LABELS.Booking Summary") }}</p>
        <div
          class="mt-3 flex flex-wrap items-center justify-between rounded-xl border border-[black] px-5 py-3 font-semibold"
        >
          <p>
            {{ $t("LABELS.Booking Confirmation Amount") }}
          </p>
          <p>
            {{ items.total_amount }}
            <sub class="font-thin">{{ items.currency }}</sub>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    required: true,
  },
});
</script>

<template>
  <div class="w-fit space-y-3 rounded-2xl bg-website-white p-3" v-if="items">
    <img
      :src="items.image"
      :alt="items.title"
      width="388"
      height="269"
      class=" h-74 w-97 rounded-2xl object-cover"
      @error="setErrorImg($event)"
    />
    <h2
      class=" text-2xl font-bold"
    >
      {{ items.name }}
    </h2>
    <div
      class="fadeInUp flex flex-wrap gap-x-8"
    >
      <div class="flex flex-wrap items-center gap-1">
        <nuxt-icon name="call" class="text-xl text-third" />
        <p class="min-w-15 capitalize text-third">
          {{ $t("LABELS.phone") }}:
        </p>
      </div>
      <a :href="`tel:${items.phone_code + items.phone}`"
        >({{ items.phone_code }}) {{ items.phone }}</a
      >
    </div>
    <div
      class="flex flex-wrap gap-x-8"
      v-if="items.email"
   
    >
      <div class="flex flex-wrap items-center gap-1">
        <nuxt-icon name="sms" class="text-xl text-third" />
        <p class="capitalize text-third">{{ $t("LABELS.email") }}:</p>
      </div>
      <p>{{ items.email }}</p>
    </div>
    <div
      class=" flex flex-wrap gap-x-8"
 
    >
      <div class="flex flex-wrap gap-1">
        <nuxt-icon name="location" class="text-xl text-third" />
        <p class="capitalize text-third">{{ $t("LABELS.address") }}:</p>
      </div>
      <p>{{ items.location_description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    required: true,
  },
});

function setErrorImg(e) {
  e.target.src = "/logo.svg";
}
</script>

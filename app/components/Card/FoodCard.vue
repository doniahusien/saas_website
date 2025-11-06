<template>
  <div
    class="bg-white mx-auto rounded-4xl p-3 cursor-pointer shadow-md overflow-hidden relative w-full"
  >
  <NuxtLink
  :to="`/item/${id}`">
    <div class="relative">
      <NuxtImg
        :src="image"
        alt="Food image"
        class="w-full rounded-lg h-60 object-cover"
      />
      <div
        class="absolute top-3 left-3 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-md"
      >
        <Icon name="mdi:star" class="text-yellow-400 text-lg" />
        <span class="ml-1 text-sm font-semibold">{{ rating }}</span>
      </div>
    </div>
    </NuxtLink>

    <div class="space-y-2 py-4">
      <h3 class="font-semibold text-lg sm:text-xl md:text-2xl">{{ title }}</h3>
      <p class="text-xs sm:text-sm text-secondary line-clamp-2">
        {{ description }}
      </p>

      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <span v-if="offer" class="text-sm line-through text-secondary"
            >{{ oldPrice }}{{currency}}</span
          >

          <span class="text-lg sm:text-xl md:text-2xl font-bold">{{ price }} {{currency}}</span>
        </div>

        <div
          v-if="offer"
          class="bg-btn cursor-pointer text-sm w-12 h-12 rounded-full text-center flex items-center justify-center text-white p-3"
        >
         <span>Off {{percentage}}%</span> 
        </div>

        <button
        @click="addFav(id)"
          v-else="offer"
          class="text-btn cursor-pointer rounded-full flex items-center justify-center p-2 bg-gray-100 hover:text-red-500"
        >
          <Icon name="mdi:heart-outline" class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  rating: Number,
  percentage: Number,
  price: Number,
  oldPrice: Number,
  offer: Boolean,
  currency: String,
  id:[String,Number]
});
</script>

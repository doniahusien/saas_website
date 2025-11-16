<template>
  <div
    class="bg-white mx-auto rounded-4xl p-3 cursor-pointer shadow-md overflow-hidden relative w-full"
  >
    <NuxtLink :to="`/item/${slug}`">
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
          <span v-if="offer" class="text-sm line-through text-secondary">
            {{ oldPrice }} {{ currency }}
          </span>
          <span class="text-lg sm:text-xl md:text-2xl font-bold">
            {{ price }} {{ currency }}
          </span>
        </div>

        <div
          v-if="offer"
          class="bg-btn text-sm w-12 h-12 rounded-full text-center flex items-center justify-center text-white p-3"
        >
          <span>Off {{ percentage }}%</span>
        </div>

        <button
          @click.stop="handleFav"
          class="cursor-pointer rounded-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          <Icon
            :name="localFav ? 'noto:heart-suit' : 'mdi:heart-outline'"
            class="w-6 h-6 transition-colors duration-200"
            :class="{ 'text-red-500': localFav }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { useToast } from "vue-toastification";

const props = defineProps({
  image: String,
  title: String,
  description: String,
  rating: Number,
  percentage: Number,
  price: Number,
  oldPrice: Number,
  offer: Boolean,
  currency: String,
  id: [String, Number],
  isfav: Boolean,
  favourite_id: [String, Number],
  slug: String,
});

const { isfav, favourite_id, id } = toRefs(props);
const appStore = useAppStore();
const toast = useToast();

const localFav = ref(isfav.value);
const favId = ref(favourite_id.value);

watch(isfav, (newVal) => {
  localFav.value = newVal;
});

const handleFav = async () => {
  try {
    if (localFav.value) {
      const res = await appStore.deleteFav(favId.value);
      if (res && res.data) {
        localFav.value = res.data.is_favourite;
        favId.value = res.data.favourite_id;
      }
    } else {
      const res = await appStore.addToFavourites(id.value);
      if (res && res.data) {
        localFav.value = res.data.is_favourite;
        favId.value = res.data.favourite_id;
      }
    }
  } catch (err) {
        toast.error(err.message);
  }
};
</script>

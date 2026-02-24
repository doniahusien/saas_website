<template>
  <div class="space-y-8">
    <div class="relative">
      <NuxtImg
        :src="image"
        alt="food image"
        class="w-full h-64 md:h-140 object-cover rounded-2xl"
      />
    </div>

    <div class="flex items-center justify-between">
      <h3 class="text-2xl md:text-5xl font-semibold">{{ title }}</h3>
      <div class="flex items-center gap-3 text-gray-500">
       <Icon
          name="lucide:share-2"
          class="size-6 hover:text-blue-500 cursor-pointer"
          @click="showShare = true"
        />
        <button
          @click.stop="handleFav"
          class="cursor-pointer rounded-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 transition"
        >
          <Icon
            :name="localFav ? 'noto:heart-suit' : 'mdi:heart-outline'"
            class="size-6 transition-colors duration-200"
            :class="{ 'text-red-500': localFav }"
          />
        </button>
       
      </div>
    </div>

      <div class="flex flex-wrap justify-between">
      <div v-if="price?.offer">
        <p class="font-medium text-black">
          <span class="text-lg line-through">{{
          price?.price || 0
          }}</span
          ><span class="mx-1 text-sm line-through">{{
          price?.currency
          }}</span>
        </p>
        <span class="text-3xl font-extrabold"
          >{{ price?.price_after || 0 }}
        </span>
        <span class="mx-1 text-sm font-extrabold">
          {{ price?.currency }}</span
        >
      </div>
      <div v-else>
        <h5 class="mb-1 text-lg font-semibold">
          <span class="text-2xl font-semibold">{{
            price?.price || 0
          }}</span>
          <span class="mx-1 text-sm font-semibold">{{
            price?.currency
          }}</span>
        </h5>
      </div>
    </div>

    <p class="text-base text-gray-500 leading-relaxed">
      {{ description }}
    </p>

   
    <ModalShareModal v-model="showShare" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const { t } = useI18n();
const props=defineProps({
  title: String,
  image: String,
  description: String,
  rating: {
    type: Number,
    default: 4.5,
  },
  id: Number,
  isfav: Boolean,
  favourite_id:Number,
  price: Object
});


const { isfav, favourite_id, id } = toRefs(props);
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();
const appStore = useAppStore();

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
const showShare = ref(false);
</script>

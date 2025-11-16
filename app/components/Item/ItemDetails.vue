<template>
  <div class="space-y-4">
    <div class="relative">
      <NuxtImg
        :src="image"
        alt="food image"
        class="w-full h-64 md:h-80 object-cover rounded-xl"
      />
    </div>

    <div class="flex items-center justify-between">
      <h3 class="text-xl md:text-2xl font-semibold">{{ title }}</h3>
      <div class="flex items-center gap-3 text-gray-500">
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
        <Icon
          name="lucide:share-2"
          class="w-6 h-6 hover:text-blue-500 cursor-pointer"
          @click="showShare = true"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex text-yellow-400">
        <Icon name="lucide:star" class="fill-yellow-500 w-5 h-5" />
        <Icon name="lucide:star" class="w-5 h-5" />
        <Icon name="lucide:star" class="w-5 h-5" />
        <Icon name="lucide:star" class="w-5 h-5" />
        <Icon name="lucide:star-half" class="w-5 h-5" />
      </div>
      <p class="text-gray-700 font-medium">{{ rating }}</p>
    </div>

    <p class="text-sm text-gray-500 leading-relaxed">
      {{ description }}
    </p>

    <div>
      <label class="block text-gray-800 font-medium mb-2">{{ $t("Note") }}</label>
      <textarea
        :placeholder="$t('notePlaceholder')"
        class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      ></textarea>
    </div>
    <ModalShareModal v-model="showShare" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
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
  favourite_id:Number
});


const { isfav, favourite_id, id } = toRefs(props);
const toast=useToast();
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

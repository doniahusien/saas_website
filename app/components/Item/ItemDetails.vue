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
      <h3 class="text-xl md:text-2xl font-semibold">
        {{ title }}
      </h3>
      <div class="flex items-center gap-3 text-gray-500">
        <Icon name="mdi:heart-outline" class="w-6 h-6 hover:text-red-500 cursor-pointer" />
        <Icon name="lucide:share-2" class="w-6 h-6 hover:text-blue-500 cursor-pointer" />
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
      <label class="block text-gray-800 font-medium mb-2">{{$t('Note')}}</label>
      <textarea
       :placeholder="$t('notePlaceholder')"
        class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n();
defineProps({
  title: String,
  image: String,
  description: String,
  rating: {
    type: Number,
    default: 4.5
  }
})
</script>

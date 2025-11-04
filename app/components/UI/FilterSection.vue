<template>
  <aside class="w-full bg-white rounded-2xl p-5 shadow-md">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold text-lg">Selected filters</h2>
      <button @click="clearAll" class="text-red-500 text-sm hover:underline">Clear all</button>
    </div>
    <UInput
      v-model="search"
      icon="i-heroicons-magnifying-glass-20-solid"
      placeholder="Search"
      class="mb-4"
    />

    <div v-if="selectedFilters.length" class="flex flex-wrap gap-2 mb-6">
      <UBadge
        v-for="(filter, index) in selectedFilters"
        :key="index"
        color="primary"
        variant="solid"
        class="flex items-center gap-1"
      >
        {{ filter }}
        <button @click="removeFilter(filter)" class="ml-1 text-xs">✕</button>
      </UBadge>
    </div>

    <div class="mb-6">
      <h3 class="text-gray-400 text-sm font-medium mb-2">Select main Categories</h3>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="cat in mainCategories"
          :key="cat"
          :variant="selectedMain === cat ? 'solid' : 'outline'"
          color="primary"
          class="rounded-xl text-sm px-4 py-2"
          @click="selectMain(cat)"
        >
          {{ cat }}
        </UButton>
      </div>
    </div>
    <div>
      <h3 class="text-gray-400 text-sm font-medium mb-2">Select sub category</h3>
      <div class="grid grid-cols-2 gap-2">
        <UButton
          v-for="sub in subCategories"
          :key="sub"
          :variant="selectedSub === sub ? 'solid' : 'outline'"
          color="primary"
          class="rounded-xl text-sm px-4 py-2"
          @click="selectSub(sub)"
        >
          {{ sub }}
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const selectedMain = ref('')
const selectedSub = ref('')
const selectedFilters = ref<string[]>([])

const mainCategories = ['Food', 'Drink', 'Dessert']
const subCategories = ['Burger', 'Pizza', 'Chicken', 'Salad', 'Grill']

const selectMain = (cat: string) => {
  selectedMain.value = cat
  if (!selectedFilters.value.includes(cat)) selectedFilters.value.push(cat)
}

const selectSub = (sub: string) => {
  selectedSub.value = sub
  if (!selectedFilters.value.includes(sub)) selectedFilters.value.push(sub)
}

const removeFilter = (filter: string) => {
  selectedFilters.value = selectedFilters.value.filter(f => f !== filter)
  if (selectedMain.value === filter) selectedMain.value = ''
  if (selectedSub.value === filter) selectedSub.value = ''
}

const clearAll = () => {
  selectedMain.value = ''
  selectedSub.value = ''
  selectedFilters.value = []
}
</script>

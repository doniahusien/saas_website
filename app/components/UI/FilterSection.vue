<template>
  <aside
    class="w-full bg-white rounded-2xl p-5 shadow-md flex flex-col justify-between h-full"
  >
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-bold text-lg">Selected filters</h2>
        <button @click="clearAll" class="text-red-500 text-sm hover:underline">
          Clear all
        </button>
      </div>

      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search"
        :ui="{
          base: ' w-full border text-black border-light-gray bg-white',
          wrapper: 'rounded-xl',
          icon: 'text-gray-400',
          input: 'text-sm  placeholder:text-gray-400',
        }"
      />
      <div v-if="selectedFilters.length" class="flex flex-wrap gap-2 my-6">
        <UBadge
          v-for="(filter, index) in selectedFilters"
          :key="index"
          variant="solid"
          :ui="{
            base:
              'bg-light-gray text-btn flex items-center gap-1 rounded-full text-xs font-medium px-2 py-1',
          }"
        >
          {{ filter }}
          <button @click="removeFilter(filter)" class="ml-1 text-xs cursor-pointer">
            <UIcon name="i-lucide-x" class="w-2 h-2" />
          </button>
        </UBadge>
      </div>

      <div class="my-10 space-y-4">
        <h3 class="text-gray-400 text-sm font-medium">Select main category</h3>
        <div class="grid grid-cols-2 gap-4">
          <UButton
            v-for="cat in mainCategories"
            :key="cat"
            :variant="selectedMain === cat ? 'solid' : 'outline'"
            :ui="{
              base:
                'flex items-center justify-center cursor-pointer rounded-xl text-sm font-medium transition-all duration-200',
              rounded: 'rounded-full',
              padding: 'px-0 py-0',
            }"
            :class="selectedMain === cat ? 'bg-btn text-white' : ' bg-white'"
            @click="selectMain(cat)"
          >
            {{ cat }}
          </UButton>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-gray-400 text-sm font-medium">Select sub category</h3>
        <div class="grid grid-cols-2 gap-4">
          <UButton
            v-for="sub in subCategories"
            :key="sub"
            :variant="selectedSub === sub ? 'solid' : 'outline'"
           
            :ui="{
              base:'flex items-center justify-center cursor-pointer rounded-xl text-sm font-medium transition-all duration-200',
               rounded: 'rounded-full',
              padding: 'px-0 py-0',
        
            }"
            :class="selectedSub === sub ? 'bg-btn text-white' : ' bg-white'"
            @click="selectSub(sub)"
          >
            {{ sub }}
          </UButton>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <button
        class= 'w-full py-3 bg-btn text-white rounded-full font-semibold text-sm',
      >
        Apply Filters
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
const selectedMain = ref("");
const selectedSub = ref("");
const selectedFilters = ref<string[]>([]);

const mainCategories = ["Food", "Drink", "Dessert"];
const subCategories = ["Burger", "Pizza", "Chicken", "Salad", "Grill"];

const selectMain = (cat: string) => {
  selectedMain.value = cat;
  if (!selectedFilters.value.includes(cat)) selectedFilters.value.push(cat);
};

const selectSub = (sub: string) => {
  selectedSub.value = sub;
  if (!selectedFilters.value.includes(sub)) selectedFilters.value.push(sub);
};

const removeFilter = (filter: string) => {
  selectedFilters.value = selectedFilters.value.filter((f) => f !== filter);
  if (selectedMain.value === filter) selectedMain.value = "";
  if (selectedSub.value === filter) selectedSub.value = "";
};

const clearAll = () => {
  selectedMain.value = "";
  selectedSub.value = "";
  selectedFilters.value = [];
  search.value = "";
};

const applyFilters = () => {
  console.log("Applied filters:", {
    search: search.value,
    main: selectedMain.value,
    sub: selectedSub.value,
    filters: selectedFilters.value,
  });
};
</script>

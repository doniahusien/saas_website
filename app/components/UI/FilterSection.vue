<script setup lang="ts">
const emit = defineEmits(["apply"]);

const { t } = useI18n();
const { $api } = useNuxtApp();

const search = ref("");
const selectedMain = ref("");
const selectedSub = ref("");
const selectedFilters = ref<string[]>([]);
const mainCategories = ref<any[]>([]);
const subCategories = ref<any[]>([]);

const branchCookie = useCookie("selectedBranch");
const storeId = ref(branchCookie.value?.id || 13);

const getMainCategories = async () => {
  try {
    const res = await $api.get("categories", {
      headers: { os: "web" },
      params: { store_id: storeId.value },
    });
    mainCategories.value = res.data.data || [];
  } catch (err) {
    console.error("Error fetching main categories", err);
  }
};

const getSubCategories = async (mainCatId) => {
  try {
    const res = await $api.get("sub-categories", {
      headers: { os: "web" },
      params: { store_id: storeId.value, category_id: mainCatId },
    });
    subCategories.value = res.data.data || [];
  } catch (err) {
    console.error("Error fetching subcategories", err);
  }
};

watch(selectedMain, (newVal) => {
  if (newVal) getSubCategories(newVal);
  else subCategories.value = [];
});

const selectMain = (cat: any) => {
  selectedMain.value = cat.id;
  if (!selectedFilters.value.includes(cat.name)) {
    selectedFilters.value.push(cat.name);
  }
};

const selectSub = (sub: any) => {
  selectedSub.value = sub.id;
  if (!selectedFilters.value.includes(sub.name)) {
    selectedFilters.value.push(sub.name);
  }
};

const removeFilter = (filter: string) => {
  selectedFilters.value = selectedFilters.value.filter((f) => f !== filter);
  if (mainCategories.value.find((c) => c.name === filter)) selectedMain.value = "";
  if (subCategories.value.find((s) => s.name === filter)) selectedSub.value = "";
};

const clearAll = () => {
  selectedMain.value = "";
  selectedSub.value = "";
  selectedFilters.value = [];
  search.value = "";
  subCategories.value = [];
};

const applyFilters = () => {
  const params: any = {
    search_by: search.value || "",
  };

  const categoryIds = [selectedMain.value, selectedSub.value].filter(Boolean);
  categoryIds.forEach((id, index) => {
    params[`category_id[${index}]`] = id;
  });

  emit("apply", params);
};

onMounted(() => {
  getMainCategories();
});
</script>

<template>
  <aside class="w-full bg-white rounded-2xl p-5 shadow-md flex flex-col">
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-bold text-lg">{{ t("filter.title") }}</h2>
        <button @click="clearAll" class="text-red-500 text-sm hover:underline">
          {{ t("filter.clearAll") }}
        </button>
      </div>

      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        :placeholder="t('filter.search')"
        :ui="{
          base: ' w-full border text-black border-light-gray bg-white',
          wrapper: 'rounded-xl',
          icon: 'text-gray-400',
          input: 'text-sm placeholder:text-gray-400',
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
        <h3 class="text-gray-400 text-sm font-medium">{{ t("filter.selectMain") }}</h3>
        <div class="grid grid-cols-2 gap-4">
          <UButton
            v-for="cat in mainCategories"
            :key="cat.id"
            :variant="selectedMain === cat.id ? 'solid' : 'outline'"
            :class="selectedMain === cat.id ? 'bg-btn text-white' : ' bg-white'"
            @click="selectMain(cat)"
          >
            {{ cat.name }}
          </UButton>
        </div>
      </div>

      <div class="space-y-4" v-if="subCategories.length">
        <h3 class="text-gray-400 text-sm font-medium">{{ t("filter.selectSub") }}</h3>
        <div class="grid grid-cols-2 gap-4">
          <UButton
            v-for="sub in subCategories"
            :key="sub.id"
            :variant="selectedSub === sub.id ? 'solid' : 'outline'"
            :class="selectedSub === sub.id ? 'bg-btn text-white' : ' bg-white'"
            @click="selectSub(sub)"
          >
            {{ sub.name }}
          </UButton>
        </div>
      </div>
    </div>

    <div class="mt-32">
      <button
        @click="applyFilters"
        class="w-full py-3 bg-btn text-white rounded-full font-semibold text-sm"
      >
        {{ t("filter.apply") }}
      </button>
    </div>
  </aside>
</template>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-0 bg-black/60 backdrop-blur-sm"    >
      <div
        class="bg-white rounded-3xl shadow-lg p-6 relative animate-fadeIn w-full md:w-170">
        <div class="flex justify-between pb-8">
          <h2 class="text-3xl font-bold">{{ t("TITLES.select_store") }}</h2>
          <button
            @click="emit('update:modelValue', false)"
            class="cursor-pointer text-black text-lg"
          >
            <Icon name="fe:close" />
          </button>
        </div>

        <div v-if="pending" class="text-center text-gray-500 py-6">
          {{ t("TITLES.loading_branches") }}
        </div>

        <div v-else class="flex flex-col gap-3 branch-list overflow-y-auto max-h-60 pe-2">
          <div
            v-for="branch in storesList"
            :key="branch.id"
            @click="pickBranch(branch)"
            class='flex items-center gap-5 bg-gray-50 rounded-xl p-5 cursor-pointer transition'
          >
            <NuxtImg
              :src="branch.image"
              alt="branch"
              class="size-20 object-cover rounded-xl"
            />
            <div class="flex flex-col flex-1">
              <p class="font-semibold text-lg">{{ branch.name }}</p>
              <p class="text-sm text-gray-600">
                {{ branch.location_description }}
              </p>
            </div>
            <div
              class="size-5 rounded-full border flex items-center justify-center"
              :class="selectedBranchId === branch.id ? 'border-btn' : ''"
            >
              <div
                v-if="selectedBranchId === branch.id"
                class="size-3 rounded-full bg-btn"
              ></div>
            </div>
          </div>
        </div>
        <button
          @click="confirmSelection"
          class="w-full text-lg rounded-full bg-btn px-2 py-4 text-white"
          :disabled="!selectedBranchId"
        >
          {{ $t("TITLES.confirm") }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { t } = useI18n();
const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps({
  modelValue: Boolean,
});

const storesCookie = useCookie("all_stores");
const pending = ref(false)
const selectedBranchCookie = useCookie<Branch | null>('selectedBranch')
const selectedBranchId = ref<number | null>(null)

const storesList = computed<Branch[]>(() => {
  try {
    if (props.stores) return props.stores as Branch[];
    const raw = storesCookie.value;
    if (!raw) return [];
    return typeof raw === "string" ? (JSON.parse(raw) as Branch[]) : (raw as Branch[]);
  } catch (e) {
    return [];
  }
});



onMounted(() => {
  selectedBranchId.value = selectedBranchCookie.value?.id ?? null
})

const pickBranch = (branch: Branch) => {
  selectedBranchId.value = branch.id
}

const selectBranch = (branch: Branch) => {
  selectedBranchId.value = branch.id;
  selectedBranchCookie.value = branch;
  emit("select", branch);
  emit("update:modelValue", false);
}

const confirmSelection = () => {
  const branch = storesList.value.find((b) => b.id === selectedBranchId.value)
  if (branch) selectBranch(branch)
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

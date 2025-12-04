<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-160 h-120 mx-4">
        <button
          class="absolute top-8 end-6 text-black"
          @click="$emit('update:modelValue', false)"
        >
          <Icon name="mdi:close" class="cursor-pointer size-6" />
        </button>
        <h2 class="text-2xl font-bold mb-2">
          {{ t("reservation.branchesTitle") }}
        </h2>
        <p class="text-gray-500 mb-6">
          {{ t("reservation.branchesSubtitle") }}
        </p>

        <div class="space-y-4 branch-list overflow-y-auto max-h-60 py-6 pe-2">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectBranch(branch)"
            class="flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition hover:bg-gray-50"
            :class="
              selected?.id === branch.id ? 'border-primary bg-primary/5' : 'border-gray-200'
            "
          >
            <NuxtImg
              :src="branch.image"
              alt="map"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold">{{ branch.name }}</p>
              <p class="text-sm text-gray-500">{{ branch.address }}</p>
            </div>
            <input
              type="radio"
              name="branch"
              :checked="selected?.id === branch.id"
              class="accent-primary"
            />
          </div>
        </div>

        <div class="flex mt-auto">
          <button
            @click="confirm"
            class="w-full py-3 cursor-pointer  bg-primary text-white font-semibold rounded-full hover:bg-primary/80 transition flex items-center justify-center gap-2"
          >
            {{ t("reservation.confirmBranch") }}
          </button>
        </div>
        
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;
const toast = useToast();

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "select"]);

const branches = ref<any[]>([]);
const selected = ref<any>(null);
const loading = ref(false);

const loadStores = async () => {
  loading.value = true;
  try {
    const res = await api.get("/stores");
    branches.value = res.data?.data ?? res.data ?? [];
  } catch (e: any) {
    toast.error(e?.message || "Failed to load stores");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadStores();
});

const selectBranch = (branch: any) => {
  selected.value = branch;
};

const confirm = () => {
  if (selected.value) {
    emit("select", selected.value);
    emit("update:modelValue", false);
  } else {
    toast.info(t("Please select a branch") || "Please select a branch");
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

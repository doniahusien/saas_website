<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-lg p-6 relative animate-fadeIn w-full max-w-md"
      >
        <button
          @click="emit('update:modelValue', false)"
          class="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 class="text-2xl font-bold mb-4">{{ t("select_store") }}</h2>

        <div v-if="pending" class="text-center text-gray-500 py-6">
          {{ t("loading_branches") }}
        </div>

        <div v-else-if="error" class="text-center text-red-500 py-6">
          {{ t("failed_to_load") }}
        </div>

        <div v-else class="flex flex-col gap-3 max-h-80 overflow-y-auto">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectBranch(branch)"
            class="flex items-center gap-4 border rounded-xl p-3 cursor-pointer transition"
            :class="
              selectedBranchId === branch.id
                ? 'border-btn bg-primary/20'
                : 'border-gray-200 hover:bg-gray-100'
            "
          >
            <NuxtImg
              :src="branch.image"
              alt="branch"
              class="w-16 h-16 object-cover rounded-full"
            />
            <div class="flex flex-col flex-1">
              <p class="font-semibold text-lg">{{ branch.name }}</p>
              <p class="text-sm text-gray-600">
                {{ branch.location_description }}
              </p>
            </div>
            <div
              class="w-5 h-5 rounded-full border flex items-center justify-center"
              :class="selectedBranchId === branch.id ? 'border-btn' : 'border-gray-300'"
            >
              <div
                v-if="selectedBranchId == branch.id"
                class="w-2.5 h-2.5 rounded-full bg-primary"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const { t } = useI18n();
const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps({ modelValue: Boolean });

const selectedBranchId = ref<number | null>(null);
const branches = ref<any[]>([]);
const pending = ref(false);
const error = ref<string | null>(null);

const { $api } = useNuxtApp();
const branchCookie = useCookie('selectedBranch', { sameSite: 'lax' }) 
const storeId = computed(() => branchCookie.value?.id || null);
onMounted(() => {storeId})
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (!isOpen) return;

    pending.value = true;
    error.value = null;
    try {
      const res = await $api.get("/stores");
      branches.value = res.data?.data || [];
    } catch (err: any) {
      console.error("Error fetching branches:", err);
      error.value = err.message || "Failed to load branches";
    } finally {
      pending.value = false;
    }
  }
);

const selectBranch = (branch: any) => {
  selectedBranchId.value = branch.id;
  const branchCookie = useCookie("selectedBranch", { sameSite: "lax" });
  branchCookie.value = branch;

  emit("update:modelValue", false);
 /*  window.location.reload(); */
};

onMounted(() => {

})
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

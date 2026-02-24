<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div class="relative bg-light-white flex h-120 w-full max-w-190 flex-col gap-4 overflow-hidden rounded-2xl p-5 shadow-lg">
        <button
          class="absolute top-8 right-6 text-black"
          @click="$emit('update:modelValue', false)"
        >
          <Icon name="mdi:close" class="size-6 cursor-pointer" />
        </button>

          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 class="text-2xl font-bold">{{ t("TITLES.deliveryAddress") }}</h2>
           
          </div>

     <div class="flex-1 flex flex-col overflow-hidden">

  <div class="flex-1 overflow-y-auto pr-1">
    <template v-if="loading">
      <div class="rounded-xl border border-dashed border-line bg-white p-6 text-center text-placeholder">
        {{ t("TITLES.loadingAddresses") }}
      </div>
    </template>

    <template v-else-if="branches.length === 0">
      <div class="rounded-xl border border-dashed border-line bg-white p-8 text-center text-placeholder">
        {{ t("TITLES.noSavedAddresses") }}
        <p class="mt-2 text-sm text-black">{{ t("TITLES.addAddressHint") }}</p>
      </div>
    </template>

    <template v-else>
      <div class="space-y-2">
        <address-card
          v-for="addr in branches"
          :key="addr.id"
          :item="addr"
          :selected="selected?.id === addr.id"
          :is-clickable="true"
          @select="selectAddress"
          @reload="handleReload"
        />
      </div>
    </template>
  </div>

  <div class="pt-4 w-full">
    <address-add-new :has-add-icon="true" @reload="handleReload" />
  </div>
</div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
 

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "selectAddress"]);

const { t } = useI18n();
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();
const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;

const branches = ref<any[]>([]);
const loading = ref(false);
const selected = ref<any | null>(null);

const syncSelected = () => {
  if (!branches.value.length) {
    selected.value = null;
    return;
  }
  if (selected.value) {
    const matched = branches.value.find((addr) => addr.id === selected.value?.id);
    if (matched) {
      selected.value = matched;
      return;
    }
  }
  selected.value = branches.value[0];
};

const loadAddresses = async () => {
  loading.value = true;
  try {
    const res = await api.get("/address");
    branches.value = res.data?.data ?? [];
    syncSelected();
  } catch (e: any) {
    toast.error(e?.message || t("ERRORS.somethingWrong"));
  } finally {
    loading.value = false;
  }
};

const handleReload = () => {
  loadAddresses();
};

const selectAddress = (address: any) => {
  selected.value = address;
  emit("selectAddress", address);
  emit("update:modelValue", false);
};

onMounted(() => {
  loadAddresses();
});
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

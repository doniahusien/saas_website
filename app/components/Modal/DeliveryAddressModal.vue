<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        v-if="showModal1 == true"
        class="bg-light-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 h-120 mx-4"
      >
        <button
          class="absolute top-8 right-6 text-black"
          @click="$emit('update:modelValue', false)"
        >
          <Icon name="mdi:close" class="cursor-pointer w-6 h-6" />
        </button>
        <h2 class="text-2xl font-bold mb-4">Delivery Address</h2>
        <div class="space-y-4 bg-white">
          <template v-if="loading">
            <div class="p-4 text-center text-placeholder">Loading addresses...</div>
          </template>

          <template v-else-if="branches.length === 0">
            <div class="p-4 text-center text-placeholder">No saved addresses.</div>
          </template>

          <template v-else>
            <div
              v-for="addr in branches"
              :key="addr.id"
              @click="selectAddress(addr)"
              class="flex items-center gap-4 p-3 rounded-xl shadow-xs shadow-line cursor-pointer transition hover:bg-gray-50"
              :class="
                selected?.id === addr.id ? 'border-btn bg-btn/5' : 'border-gray-200'
              "
            >
              <div
                class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-placeholder"
              >
                <Icon name="mdi:map-marker" class="w-6 h-6" />
              </div>
              <div class="flex-1">
                <p class="font-semibold">
                  {{ addr.title ?? addr.name ?? addr.type ?? "Address" }}
                </p>
                <p class="text-sm text-placeholder">
                  {{ addr.location_description ?? addr.desc ?? addr.address ?? "" }}
                </p>
                <p
                  v-if="addr.building || addr.floor || addr.apartment"
                  class="text-xs text-placeholder mt-1"
                >
                  <span v-if="addr.building">Bld: {{ addr.building }}</span>
                  <span v-if="addr.floor"> • Flr: {{ addr.floor }}</span>
                  <span v-if="addr.apartment"> • Apt: {{ addr.apartment }}</span>
                </p>
              </div>
              <div class="text-sm text-placeholder">
                <Icon name="mynaui:edit-one" class="text-placeholder w-5 h-5" />
                <Icon name="ei:trash" class="text-red-400 w-6 h-6 cursor-pointer" />

                <input class="hidden" type="radio" :checked="selected?.id === addr.id" />
              </div>
            </div>
          </template>
        </div>

        <div class="mt-auto">
          <button
            @click="switchToModal2"
            class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
          >
            Add New Address
            <span class="w-4 h-4 flex justify-center items-center bg-white rounded-full"
              ><Icon name="entypo:plus" class="w-3 h-3 text-btn"
            /></span>
          </button>
        </div>
      </div>

      <ModalAddAddresModal v-else @switch-back="switchToModal1" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
const { t, locale } = useI18n();
const showModal1 = ref(true);
const showModal2 = ref(false);
const branches = ref<any[]>([]);
const loading = ref(false);
const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;
const toast = useToast();

const switchToModal2 = () => {
  showModal1.value = false;
  showModal2.value = true;
};
const switchToModal1 = () => {
  showModal2.value = false;
  showModal1.value = true;
};

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "selectAddress"]);

const selected = ref<any | null>(null);

const loadAddresses = async () => {
  loading.value = true;
  try {
    const res = await api.get("/address");
    branches.value = res.data?.data ?? [];
    // default-select the first address (do not emit/close modal)
    if (branches.value.length > 0 && !selected.value) {
      selected.value = branches.value[0];
    }
  } catch (e: any) {
    toast.error(e?.message || "Failed to load addresses");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAddresses();
});

const selectAddress = (address: any) => {
  selected.value = address;
  emit("selectAddress", address);
  emit("update:modelValue", false);
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

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="bg-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 mx-4"
      >
        <div class="flex items-center justify-between mb-6">      
          <h2 class="text-2xl font-bold">Select your reason</h2>
          <button
            class="text-black hover:text-gray-600"
            @click="$emit('update:modelValue', false)"
          >
            <Icon name="mdi:close" class="cursor-pointer w-6 h-6" />
          </button>
        </div>



        <div class="space-y-3 mb-6">
          <template v-if="loading">
            <div class="text-center text-placeholder py-4">Loading reasons...</div>
          </template>

          <template v-else>
            <label
              v-for="reason in reasons"
              :key="reason.id"
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              :class="selectedReasonId === reason.id ? 'bg-blue-50' : ''"
            >
              <input
                type="radio"
                :value="reason.id"
                v-model="selectedReasonId"
                class="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span class="flex-1 text-base">{{ reason.desc }}</span>
            </label>

            <label
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              :class="selectedReasonId === 'other' ? 'bg-btn' : ''"
            >
              <input
                type="radio"
                value="other"
                v-model="selectedReasonId"
                class="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span class="flex-1 text-base">Other</span>
            </label>
          </template>
        </div>

        <div v-if="selectedReasonId === 'other'" class="mb-6">
          <label class="block text-base font-semibold mb-2">Type your reason here</label>
          <textarea
            v-model="customReason"
            placeholder="Type your reason here"
            maxlength="100"
            class="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          ></textarea>
          <p class="text-red-500 text-sm mt-2">
            {{ 100 - customReason.length }} Character{{ 100 - customReason.length !== 1 ? 's' : '' }} left
          </p>
        </div>

        <button
          @click="handleConfirm"
          :disabled="!canConfirm || submitting"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          <span v-if="!submitting">Confirm</span>
          <span v-else>Processing...</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const props = defineProps({
  modelValue: Boolean,
  orderId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "confirmed"]);

const nuxtApp = useNuxtApp();
const api = nuxtApp.$api;
const toast = useToast();

const reasons = ref<any[]>([]);
const loading = ref(false);
const selectedReasonId = ref<number | string | null>(null);
const customReason = ref("");
const submitting = ref(false);

const canConfirm = computed(() => {
  if (!selectedReasonId.value) return false;
  if (selectedReasonId.value === "other") {
    return customReason.value.trim().length > 0;
  }
  return true;
});

const loadReasons = async () => {
  loading.value = true;
  try {
    const res = await api.get("/cancel_reasons");
    reasons.value = res.data?.data ?? [];
  } catch (e: any) {
    toast.error(e?.message || "Failed to load cancel reasons");
    console.error("Error loading cancel reasons:", e);
  } finally {
    loading.value = false;
  }
};

const handleConfirm = async () => {
  if (!canConfirm.value) return;

  submitting.value = true;
  try {
    const form = new FormData();
    form.append("_method", "put");

    if (selectedReasonId.value === "other") {
      form.append("desc_cancel_reason", customReason.value.trim());
    } else {
      form.append("cancel_reason_id", String(selectedReasonId.value));
    }

    if (props.orderId) {
      await api.post(`/orders/${props.orderId}/cancel`, form);
      toast.success("Order cancelled successfully");
      emit("confirmed");
      emit("update:modelValue", false);
    } else {
      emit("confirmed", {
        reasonId: selectedReasonId.value,
        customReason: customReason.value,
      });
      emit("update:modelValue", false);
    }
  } catch (e: any) {
    toast.error(e?.message || "Failed to cancel order");
    console.error("Error cancelling order:", e);
  } finally {
    submitting.value = false;
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      loadReasons();
      selectedReasonId.value = null;
      customReason.value = "";
    }
  }
);
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


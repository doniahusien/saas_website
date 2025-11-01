<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 relative animate-fadeIn">
        <button
          @click="emit('update:modelValue', false)"
          class="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold mb-2">{{ $t("auth.editPhoneTitle") }}</h2>
        <p class="text-gray-500 text-sm mb-5">
          {{ $t("auth.editPhoneInstruction") }}
        </p>

        <VeeForm :validation-schema="schema" @submit="handleSubmit">
          <inputsPhoneInput
            codeName="phone_code"
            phoneName="phone"
            :placeholder="$t('auth.phone')"
            v-model:code="form.phone_code"
            v-model:phone="form.phone"
          />
          <button
            type="submit"
            :disabled="loading"
            class="bg-indigo-500 text-white w-full rounded-full mt-6 py-3 text-lg font-medium hover:bg-indigo-600 transition-all"
          >
            <span v-if="!loading">{{ $t("auth.edit") }}</span>
            <span v-else>...</span>
          </button>
        </VeeForm>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useAppAuth } from "~/store/auth";
import { useToast } from "vue-toastification";
import * as yup from "yup";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();
const appAuth = useAppAuth();
const toast = useToast();
const router = useRouter();
const { $api } = useNuxtApp();
const form = reactive({
  phone_code: "",
  phone: "",
});

const schema = yup.object({
  phone_code: yup.string().required("Please select a country code"),
  phone: yup.string().required("Please enter your phone number"),
});

const loading = ref(false);

watch(
  () => appAuth.tempVerifyData,
  (newVal) => {
    if (newVal) {
      form.phone_code = newVal.phone_code;
      form.phone = newVal.phone;
    }
  },
  { immediate: true, deep: true }
);

async function handleSubmit() {
  try {
    loading.value = true;
    const payload = {
      old_phone_code: appAuth.tempVerifyData.phone_code,
      old_phone: appAuth.tempVerifyData.phone,
      new_phone_code: form.phone_code,
      new_phone: form.phone,
    };

    const { data } = await $api.post("/auth/edit_phone", payload);
    if (data?.status === "success" || data?.success === true) {
      appAuth.tempVerifyData = {
        phone_code: form.phone_code,
        phone: form.phone,
      };

      toast.success(data?.message || "Phone number updated successfully!");
      emit("update:modelValue", false);
      router.push("/auth/verify");
    } else {
      toast.error(data?.message || "Failed to update phone number.");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong.");
  } finally {
    loading.value = false;
  }
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
.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

<template>
  <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />

  <h2 class="font-bold text-3xl md:text-5xl">
    {{ t("auth.forgotPasswordTitle") }}
  </h2>

  <p class="text-secondary my-5 text-base md:text-lg">
    {{ t("auth.forgotPasswordInstruction") }}
  </p>

  <VeeForm @submit="handleSubmit" :validation-schema="schema">
    <inputsPhoneInput
      codeName="phone_code"
      phoneName="phone"
      v-model:code="form.phone_code"
      v-model:phone="form.phone"
    />
    <button
      :disabled="loading"
      type="submit"
      class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
    >
      <span v-if="!loading">{{ t("auth.send") }}</span>
      <span v-else>...</span>
    </button>
  </VeeForm>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

definePageMeta({
  layout: "auth",
});

const { t } = useI18n();
const { $api } = useNuxtApp();
const router = useRouter();
const toast = useToast();
const appAuth = useAppAuth();
const loading = ref(false);

const form = reactive({
  phone_code: "",
  phone: "",
});

const schema = yup.object({
  phone_code: yup.string().required(),
  phone: yup.string().required(),
});

async function handleSubmit() {
  try {
    loading.value = true;
    const payload = {
      phone_code: form.phone_code,
      phone: form.phone,
    };

    const { data } = await $api.post("/auth/forgot_password", payload);

    if (data?.status === "success") {
      toast.success(data?.message || "Verification code sent successfully!");

      appAuth.setTempVerifyData(payload);
      router.push({
        path: "/auth/verify",
        query: {
          from: "forgot",
        },
      });
    } else {
      toast.error(data?.message || "Failed to send verification code.");
    }
  } catch (err: any) {
    console.error("Forgot password error:", err);
    toast.error(err?.response?.data?.message || "Something went wrong.");
  } finally {
    loading.value = false;
  }
}
</script>

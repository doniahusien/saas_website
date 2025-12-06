<template>
  <div class="w-full space-y-5">
     <h2 class="font-medium text-3xl md:text-4xl">
    {{ t("auth.forgotPasswordTitle") }}
  </h2>

  <p class="text-text-light  text-base md:text-lg">
    {{ t("auth.forgotPasswordInstruction") }}
  </p>

  <VeeForm @submit="handleSubmit" :validation-schema="schema">
    <inputsPhoneInput
      codeName="phone_code"
      phoneName="phone"
      v-model:code="form.phone_code"
      v-model:phone="form.phone"
      @country-selected="onCountrySelected"
    />
    <button
      :disabled="loading"
      type="submit"
      class="bg-primary cursor-pointer mt-5 text-white text-base md:text-lg w-full  rounded-full p-5"
    >
      <span v-if="!loading">{{ t("auth.send") }}</span>
      <span v-else>...</span>
    </button>
  </VeeForm>
  </div>
 
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
const localePath = useLocalePath();
const phoneLimit = ref(null);
const form = reactive({
  phone_code: "",
  phone: "",
});
function onCountrySelected(country) {
  phoneLimit.value = country?.phone_limit || null;
}

const schema = yup.object({
  phone_code: yup.string().required(t("auth.phoneCodeRequired")),
  phone: yup.string().required(t("auth.phoneRequired")).test(
  "phone-limit",
  (value) => {
    if (!value) return "Phone number is required";

    return `Phone number must be ${phoneLimit.value} digits`;
  },
  (value) => {
    if (!value) return false;
    if (!phoneLimit.value) return true;
    return value.length === phoneLimit.value;
  }
),

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
      toast.success($t('auth.Verification code sent successfully'));

      appAuth.setTempVerifyData(payload);
      router.push({
        path: localePath("/auth/verify"),
        query: {
          from: "forgot",
        },
      });
    } else {
      toast.error(data?.message || "Failed to send verification code.");
    }
  } catch (err: any) {
    console.error("Forgot password error:", err);
    toast.error(err?.message || "Something went wrong.");
  } finally {
    loading.value = false;
  }
}
useDynamicMeta({
  title: t("auth.forgotPasswordTitle"),
  description: t("auth.forgotPasswordInstruction")
});
</script>

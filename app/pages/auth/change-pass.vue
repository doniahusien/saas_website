<template>
  <h2 class="font-medium text-3xl md:text-4xl">
    {{ t("auth.changePasswordTitle") }}
  </h2>

  <p class="text-text-light my-4 text-base">
    {{ t("auth.changePasswordInstruction") }}
  </p>

  <VeeForm class="space-y-5" @submit="handleSubmit" :validation-schema="schema">
      <inputsBasePassword
        id="password"
        name="password"
        v-model="form.password"
        :placeholder="t('auth.newPassword')"
      />
      <inputsBasePassword
        id="password_confirmation"
        name="password_confirmation"
        v-model="form.password_confirmation"
        :placeholder="t('auth.confirmNewPassword')"
      />

    <button
      :disabled="loading"
      type="submit"
      class="bg-primary cursor-pointer text-white text-base md:text-lg w-full  rounded-full p-5 disabled:opacity-50"
    >
      <span v-if="!loading">{{ t("auth.confirm") }}</span>
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
const toast = useToast();
const router = useRouter();
const route = useRoute();
const appAuth = useAppAuth();
const loading = ref(false);
const localePath = useLocalePath();

const form = reactive({
  phone_code: "",
  phone: "",
  reset_code: "",
  password: "",
  password_confirmation: "",
});

const schema = yup.object({
  password: yup.string().required(t("auth.passwordRequired")).min(6, t("auth.passwordLength")),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("auth.passwordMatch"))
    .required(t("auth.passwordConfirmRequired")),
});

onMounted(() => {
  form.phone_code = appAuth.tempVerifyData.phone_code;
  form.phone = appAuth.tempVerifyData.phone;
  form.reset_code = appAuth.tempVerifyData.reset_code;
});

async function handleSubmit(values: any) {
  try {
    loading.value = true;

    const payload = {
      phone_code: form.phone_code,
      phone: form.phone,
      reset_code: form.reset_code,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    const { data } = await $api.post("/auth/reset_password", payload);

    if (data?.status === "success") {
      appAuth.clearTempVerifyData(); 
      toast.success(data?.message || "Password changed successfully!");
      router.push(localePath("/auth/login"));
    } 
  } catch (err: any) {
    toast.error(err?.message || "Something went wrong.");
  } finally {
    loading.value = false;
  }
}
useDynamicMeta({
  title: t("auth.changePasswordTitle"),
  description: t("auth.changePasswordInstruction")
});
</script>

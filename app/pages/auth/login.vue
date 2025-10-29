<template>
  <div class="container flex flex-col flex-1 justify-center items-start">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain mb-6" />

    <h2 class="font-bold mb-2 text-3xl md:text-5xl">{{ t("auth.welcomeBack") }}</h2>
    <p class="text-secondary text-base md:text-lg mb-8">
      {{ t("auth.enterCredentials") }}
    </p>

    <div class="w-full">
      <VeeForm class="w-full" :validation-schema="schema" @submit="onSubmit">
        <div class="space-y-5 py-6">
          <inputsPhoneInput
            codeName="phone_code"
            phoneName="phone"
            :placeholder="t('auth.phone')"
            v-model:code="form.phone_code"
            v-model:phone="form.phone"
          />
          <inputsBasePassword
            name="password"
            v-model="form.password"
            :placeholder="t('auth.password')"
          />
        </div>

        <div class="flex justify-between items-center">
          <UCheckbox :label="t('auth.rememberMe')" :ui="{ label: 'text-secondary' }" />
          <NuxtLink to="/auth/forgot-pass" class="underline text-sm md:text-base">
            {{ t("auth.forgotPassword") }}
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4 transition-transform hover:scale-[1.02] disabled:opacity-50"
          :disabled="loading"
        >
          <span v-if="!loading">{{ t("auth.login") }}</span>
          <span v-else>{{ t("auth.loggingIn") }}...</span>
        </button>

        <p class="text-center pt-5">
          {{ t("auth.dontHaveAccount") }}
          <NuxtLink to="/auth/signup" class="text-btn font-semibold">
            {{ t("auth.signUpNow") }}
          </NuxtLink>
        </p>
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useAppAuth } from "~/store/auth";
import { useToast } from "vue-toastification";

definePageMeta({ layout: "auth" });

const { t } = useI18n();
const appAuth = useAppAuth();
const loading = ref(false);
const toast = useToast();

const form = reactive({
  phone_code: "",
  phone: "",
  password: "",
});

const schema = yup.object({
  phone_code: yup.string().required(t("auth.phoneCodeRequired")),
  phone: yup
    .string()
    .required(t("auth.phoneRequired"))
    .matches(/^[0-9]+$/, t("auth.invalidPhone"))
    .min(6, t("auth.phoneTooShort"))
    .max(15, t("auth.phoneTooLong")),
  password: yup.string().required(t("auth.passwordRequired")),
});

async function onSubmit(values: any) {
  try {
    loading.value = true;
    await appAuth.login({
      phone_code: values.phone_code,
      phone: values.phone,
      password: values.password,
      device_type: "web",
      device_token: "123456",
    });
  } catch (error) {
    /*     toast.error(t("auth.invalidCredentials")); */
  } finally {
    loading.value = false;
  }
}
</script>

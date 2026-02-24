<template>
  <div class="w-full space-y-3">
    <h2 class="font-medium text-text text-2xl md:text-4xl">{{ t("auth.welcomeBack") }}</h2>
    <p class="text-text-light text-base mb-2">
      {{ t("auth.enterCredentials") }}
    </p>
      <VeeForm class="space-y-7"  :validation-schema="schema" @submit="onSubmit">
          <inputsPhoneInput
            codeName="phone_code"
            phoneName="phone"
            :placeholder="t('auth.phone')"
            v-model:code="form.phone_code"
            v-model:phone="form.phone"
            @country-selected="onCountrySelected"
          />
          <inputsBasePassword
            name="password"
            v-model="form.password"
            :placeholder="t('auth.password')"
          />

        <div class="flex justify-between">
          <UCheckbox :label="t('auth.rememberMe')" :ui="{ label: 'text-text-light' }" />
          <NuxtLink :to="localePath('/auth/forgot-pass')" class=" text-primary  md:text-lg">
            {{ t("auth.forgotPassword") }}
          </NuxtLink>
        </div>

        <button
          type="submit"
          class="bg-primary cursor-pointer text-white text-medium md:text-lg w-full rounded-full p-5 transition-transform hover:scale-[1.02] disabled:opacity-50"
          :disabled="loading"
        >
          <span v-if="!loading">{{ t("auth.login") }}</span>
          <span v-else>{{ t("auth.loggingIn") }}...</span>
        </button>

        <p class="text-center font-bold">
          {{ t("auth.dontHaveAccount") }}
          <NuxtLink :to="localePath('/auth/signup')" class="text-primary text-base">
            {{ t("auth.signUpNow") }}
          </NuxtLink>
        </p>
      </VeeForm>

  </div>
  
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useAppAuth } from "~/store/auth";
 

definePageMeta({ layout: "auth" });

const { t } = useI18n();
const appAuth = useAppAuth();
const loading = ref(false);
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();
const localePath = useLocalePath();
const router = useRouter();
const {$api}= useNuxtApp();
const phoneLimit = ref(null);

const form = reactive({
  phone_code: "",
  phone: "",
  password: "",
});
function onCountrySelected(country) {
  phoneLimit.value = country?.phone_limit || null;
}

const schema = yup.object({
  phone_code: yup.string().required(t("auth.phoneCodeRequired")),

  phone: yup
    .string()
    .required(t("auth.phoneRequired"))
    .matches(/^[0-9]+$/, t("auth.invalidPhone"))
    .test(
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

  password: yup.string().required(t("auth.passwordRequired")),
});


async function onSubmit(values: any) {
  try {
    loading.value = true;
    const {data} = await $api.post('/auth/login', {
      phone_code: values.phone_code,
      phone: values.phone,
      password: values.password,
      device_type: "web",
      device_token: "123456",
    });
    const user= data.data;
    appAuth.setAuthData(user)
    toast.success(t(data.message));
    router.push(localePath("/"));
  } catch (error: any) {
    const msg = error?.response?.data?.message || t("auth.invalidCredentials")
    toast.error(msg);
  } finally {
    loading.value = false;
  }
}
useDynamicMeta({
  title: t("auth.login"),
  description: t("auth.enterCredentials")
});
</script>

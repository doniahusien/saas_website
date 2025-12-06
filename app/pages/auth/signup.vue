<template>
  <h2 class="font-medium mb-2 text-3xl md:text-4xl">{{ $t("auth.createAccount") }}</h2>

  <VeeForm class="space-y-4 " @submit="handleSubmit" :validation-schema="schema">
      <inputsBaseInput id="name" name="name" :placeholder="t('auth.name')" />
      <inputsPhoneInput
        codeName="phone_code"
        phoneName="phone"
        :placeholder="t('auth.phone')"
        v-model:code="form.phone_code"
        v-model:phone="form.phone"
        @country-selected="onCountrySelected"
      />
      <inputsBaseInput id="email" name="email" :placeholder="t('auth.email')" />
      <inputsBasePassword
        name="password"
        v-model="form.password"
        :placeholder="t('auth.password')"
      />

    <UCheckbox :label="t('auth.rememberMe')" :ui="{ label: 'text-text-light' }" />

    <button
      :disabled="loading"
      type="submit"
      class="bg-primary text-white w-full rounded-full p-5"
    >
      <span v-if="!loading">{{ t("auth.register") }}</span>
      <span v-else>...</span>
    </button>
  </VeeForm>
  <p class="text-center mt-5">
    {{ t("auth.haveAccount") }}
    <NuxtLink :to="localePath('/auth/login')" class="text-primary font-semibold">
      {{ t("auth.login") }}
    </NuxtLink>
  </p>
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
const localePath = useLocalePath();
const router = useRouter();
const { $api } = useNuxtApp();
const phoneLimit = ref(null);

const form = reactive({
  email: "",
  name: "",
  phone_code: "",
  phone: "",
  password: "",
});

function onCountrySelected(country) {
  phoneLimit.value = country?.phone_limit || null;
}

const schema = yup.object({
  name: yup.string().required(t("auth.nameRequired")),
  email: yup.string().email(t("auth.invalidEmail")).required(t("auth.emailRequired")),
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

async function handleSubmit(values: any) {
  try {
    loading.value = true;

    const { data } = await $api.post("/auth/register", {
      full_name: values.name,
      email: values.email,
      phone_code: values.phone_code,
      phone: values.phone,
      password: values.password,
      password_confirmation: values.password,
      device_type: "web",
      device_token: "123456",
    });

    if (data && data.data === null) {
      appAuth.setTempVerifyData({
        phone_code: values.phone_code,
        phone: values.phone,
      });
    }

    toast.success(t(data.message));
    router.push(localePath("/auth/verify"));
  } catch (error: any) {
    console.error(error);
    toast.error(error?.message || $t('auth.Registration failed'));
  } finally {
    loading.value = false;
  }
}
useDynamicMeta({
  title: t("auth.register"),
  description: t("auth.createAccount")
});
</script>

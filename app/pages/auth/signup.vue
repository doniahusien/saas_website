<template>
  <div class="container flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />
    <h2 class="font-bold mb-4 text-3xl md:text-5xl">{{ $t("auth.createAccount") }}</h2>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-4 py-5">
        <inputsBaseInput id="name" name="name" :placeholder="t('auth.name')" />
        <inputsPhoneInput
          codeName="phone_code"
          phoneName="phone"
          :placeholder="t('auth.phone')"
          v-model:code="form.phone_code"
          v-model:phone="form.phone"
        />
        <inputsBaseInput id="email" name="email" :placeholder="t('auth.email')" />
        <inputsBasePassword
          name="password"
          v-model="form.password"
          :placeholder="t('auth.password')"
        />
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white w-full mt-8 rounded-full p-4"
      >
        {{ t("auth.register") }}
      </button>
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
const toast = useToast();

const form = reactive({
  email: "",
  name: "",
  phone_code: "",
  phone: "",
  password: "",
});

const schema = yup.object({
  name: yup.string().required(t("auth.nameRequired")),
  email: yup.string().email(t("auth.invalidEmail")).required(t("auth.emailRequired")),
  phone_code: yup.string().required(t("auth.phoneCodeRequired")),
  phone: yup
    .string()
    .required(t("auth.phoneRequired"))
    .matches(/^[0-9]+$/, t("auth.invalidPhone"))
    .min(6, t("auth.phoneTooShort"))
    .max(15, t("auth.phoneTooLong")),
  password: yup.string().required(t("auth.passwordRequired")),
});

async function handleSubmit(values: any) {
  try {
    loading.value = true;
    await appAuth.signup({
      name: values.name,
      email: values.email,
      phone_code: values.phone_code,
      phone: values.phone,
      password: values.password,
      device_type: "web",
      device_token: "123456",
    });
  } catch (error) {
    console.error("error is",error);
   
    
  } finally {
    loading.value = false;
  }
}
</script>

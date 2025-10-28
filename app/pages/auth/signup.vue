<template>
  <div class="container flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />
    <h2 class="font-bold mb-4 text-3xl md:text-5xl">{{ $t("auth.createAccount") }}</h2>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-4 py-5">
        <inputsBaseInput id="name" name="name" :placeholder="t('auth.name')" />
        <inputsPhoneInput />
        <inputsBaseInput id="email" name="email" :placeholder="t('auth.email')" />
        <inputsBasePassword
          id="password"
          name="password"
          :placeholder="t('auth.password')"
        />
      </div>
      <div class="grid grid-cols-2">
        <UCheckbox
          :label="t('auth.rememberMe')"
          :ui="{
            label: 'text-secondary',
          }"
        />
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{ $t("auth.register") }}
      </button>
      <p class="text-center pt-3">
        {{ $t("auth.haveAccount") }}
        <NuxtLink to="/auth/login" class="text-btn">
          {{ $t("auth.login") }}
        </NuxtLink>
      </p>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { configure } from "vee-validate";
import * as yup from "yup";
const { t } = useI18n();
definePageMeta({
  layout: "auth",
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = yup.object().shape({
  email: yup
    .string()
    .email(t("ERRORS.validEmailAddress"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.email") })),
  name: yup
    .string()
    .email(t("ERRORS.validName"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.name") })),
  password: yup.string().required(t("ERRORS.Name")),
});

const loading = ref(false);

type schem = {
  email: string;
  name: string;
  password: string;
};

async function handleSubmit(values: schem) {
  loading.value = true;

  await axios
    .post("auth/login", values)
    .then(async (res) => {
      localStorage.setItem("jwt_token_saas_global", res.data.data.token);
      /*    localStorage.setItem(
        "shebl_global_user_data",
        JSON.stringify(res.data.data)
      ); */

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.data.token}`;
      setTimeout(() => {
        toast.success(res.data.message);
        router.push("/");
      }, 400);

      appAuth.token = res.data.data.token;
      appAuth.userData = res.data.data;
      appAuth.user_type = res.data.data.user_type;
      localStorage.setItem("saas_global_user_type", res.data.data.user_type);
      appStore.is_auth = `Bearer ${res.data.data.token}`;

      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e.response.data.message);
    });
}
</script>

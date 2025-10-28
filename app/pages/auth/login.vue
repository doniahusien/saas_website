<template>
  <div class="container flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />
    <h2 class="font-bold mb-4 text-3xl md:text-5xl">{{$t('auth.welcomeBack')}}</h2>
    <p class="text-secondary text-base md:text-lg">
      {{$t('auth.enterCredentials')}}
    </p>
    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-6 py-10">
        <inputsPhoneInput/>
        <inputsBasePassword id="password" name="password" :placeholder="t('auth.password')" />
      </div>
      <div class="grid grid-cols-2">
        <UCheckbox
          :label="t('auth.rememberMe')"
          :ui="{
            label: 'text-secondary',
          }"
        />
        <NuxtLink to="/auth/forgot-pass" class="underline text-sm md:text-base"
          >{{$t('auth.forgotPassword')}}</NuxtLink
        >
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{$t('auth.login')}}
      </button>
      <p class="text-center pt-5">
        {{$t('auth.dontHaveAccount')}}
        <NuxtLink to="/auth/signup" class="text-btn">{{$t('auth.signUpNow')}}</NuxtLink>
      </p>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
definePageMeta({
  layout: "auth",
});

/* configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});
 */
/* 
const schema = yup.object().shape({
  email: yup
    .string()
    .email(t("ERRORS.validEmailAddress"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.email") })),

  password: yup.string().required(t("ERRORS.password")),
});
 */
const loading = ref(false);

/* type schem = {
  email: string;
  password: string;
}; */

/* async function handleSubmit(values: schem) {
  loading.value = true;

  await axios
    .post("auth/login", values)
    .then(async (res) => {
      localStorage.setItem("jwt_token_shebl_global", res.data.data.token);
      localStorage.setItem(
        "shebl_global_user_data",
        JSON.stringify(res.data.data)
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.token}`;
      setTimeout(() => {
        toast.success(res.data.message)
        router.push("/")
      }, 400);

      appAuth.token = res.data.data.token;
      appAuth.userData = res.data.data;
      appAuth.user_type = res.data.data.user_type;
      localStorage.setItem("shebl_global_user_type", res.data.data.user_type);
      appStore.is_auth = `Bearer ${res.data.data.token}`;

      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e.response.data.message);
    });
} */
</script>

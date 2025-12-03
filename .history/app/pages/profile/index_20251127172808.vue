<template>
  <div class="container mx-auto space-y-16 px-5 md:px-0 my-20">
    <h2 class="font-bold text-3xl md:text-6xl">
      {{ t("TITLES.My profile") }}
    </h2>

    <VeeForm
      :validation-schema="schema"
      @submit="handleSubmit"
      v-model="formValues"
      class=""
    >
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 justify-content-between">
        <div class="flex flex-col items-center gap-5 lg:col-span-2">
          <div class="relative">
            <inputsBaseFile
              modal-name="users"
              modal-type="image"
              id="image"
              name="image"
              :placeholder="$t('LABELS.image')"
              label=""
              v-model="formValues.image"
              v-model:itemValue="formValues.preview"
              accept="image/png, image/webp, image/jpeg"
              iconSrc="/images/food3.png"
              :attachment="'/store_attachment'"
              :return-file="false"
              @uploading="btnLoading = $event"
            />
          </div>

          <div class="flex items-center text-btn gap-2">
            <Icon name="charm:key" class="text-2xl" />
            <button type="button" class="underline" @click="openModal = true">
              {{ $t("TITLES.Change Password") }}
            </button>
          </div>
        </div>

        <div class="lg:col-span-3 flex flex-col gap-5">
          <inputsBaseInput
            id="full_name"
            name="full_name"
            placeholder=" "
            v-model="formValues.full_name"
          />

          <inputsPhoneInput
            :disabled="true"
            codeName="phone_code"
            phoneName="phone"
            v-model:code="formValues.phoneCode"
            v-model:phone="formValues.phone"
          />
          <button class="text-btn ms-auto">{{ $t("TITLES.changePhone") }}</button>
          <inputsBaseInput
            id="email"
            name="email"
            placeholder=" "
            type="email"
            v-model="formValues.email"
          />

          <button
            type="submit"
            class="bg-btn rounded-full ms-auto px-16 text-white py-2"
            :disabled="btnLoading"
          >
            {{ $t("BUTTONS.save") }}
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

const toast = useToast();
const appAuth = useAppAuth();
const { $api } = useNuxtApp();
const { t } = useI18n();

const openModal = ref(false);
const btnLoading = ref(false);

const formValues = reactive({
  full_name: "",
  email: "",
  phone: "",
  phoneCode: "",
  image: "",
  preview: "",
});

const schema = yup.object().shape({
  full_name: yup.string().required(t("ERRORS.isRequired", { name: t("LABELS.name") })),
  email: yup
    .string()
    .email(t("ERRORS.isValidEmail"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.email") })),
  phone: yup.string().required(t("ERRORS.isRequired", { name: t("LABELS.phone") })),
  phone_code: yup.string().required(),
  image: yup.mixed().nullable(),
});

function handleSubmit(values) {
  btnLoading.value = true;

  const formData = new FormData();
  formData.append("_method", "patch");
  formData.append("full_name", values.full_name);
  formData.append("email", values.email);

  if (values.image) {
    if (values.image instanceof File) formData.append("avatar", values.image);
    else formData.append("avatar", values.image);
  }

  $api
    .post("/profile", formData)
    .then((res) => {
      appAuth.getProfile();
      toast.success(res.data?.message || t("STATUS.success"));
    })
    .catch((e) => {
      toast.error(e?.response?.data?.message || t("STATUS.error"));
    })
    .finally(() => {
      btnLoading.value = false;
    });
}

onMounted(async () => {
  await appAuth.getProfile();

  const user = appAuth.userData;
  if (!user) return;

  formValues.full_name = user.full_name ?? "";
  formValues.email = user.email ?? "";
  formValues.phone = user.phone ?? "";
  formValues.phoneCode = user.phone_code ?? "";
  formValues.preview = user.avatar ?? "";
  formValues.image = user.avatar ?? "";
});
</script>

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

          <ProfileChangePhone @reload="reloadProfile" />
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
    <teleport to="body">
      <div class="relative">
        <general-modal
          classes=" !w-full md:!max-w-150 bg-white"
          :persist="true"
          v-if="openModal"
          :title="t('TITLES.Change Password')"
          @close="openModal = false"
        >
          <VeeForm
            as="div"
            :validation-schema="passwordSchema"
            @submit="changePassword"
          >
            <form class="space-y-4">
              <inputsBasePassword
                id="old_password"
                name="old_password"
                v-model="passwordForm.old_password"
                label="current password"
                :placeholder="t('LABELS.current password')"
              />
              <inputsBasePassword
                id="password"
                name="password"
                v-model="passwordForm.password"
                label="new password"
                :placeholder="t('LABELS.new password')"
              />
              <inputsBasePassword
                id="password_confirmation"
                name="password_confirmation"
                v-model="passwordForm.password_confirmation"
                label="confirmPassword"
                :placeholder="t('LABELS.confirmPassword')"
              />

              <div class="flex items-center justify-end">
                <button
                  class="base-btn rounded-full px-16"
                  :disabled="btnLoading"
                  type="submit"
                >
                  {{ $t("BUTTONS.save") }}
                </button>
              </div>
            </form>
          </VeeForm>

          <general-modal-success
            :persist="true"
            v-if="openSuccessModal"
            :title="t('TITLES.Change Password')"
            :message="t('TITLES.The password has been successfully changed')"
            @close="openSuccessModal = false"
          />
        </general-modal>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";
import ProfileChangePhone from "~/components/Profile/ChangePhone.vue";

const toast = useToast();
const appAuth = useAppAuth();
const { $api } = useNuxtApp();
const { t } = useI18n();

const openModal = ref(false);
const btnLoading = ref(false);
const openSuccessModal = ref(false);

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

const passwordForm = reactive({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const passwordSchema = yup.object().shape({
  old_password: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.current password") })),
  password: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.new password") })),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("ERRORS.passwordsMustMatch"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.confirmPassword") })),
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

async function reloadProfile() {
  await appAuth.getProfile();

  const user = appAuth.userData;
  if (!user) return;

  formValues.full_name = user.full_name ?? "";
  formValues.email = user.email ?? "";
  formValues.phone = user.phone ?? "";
  formValues.phoneCode = user.phone_code ?? "";
  formValues.preview = user.avatar ?? "";
  formValues.image = user.avatar ?? "";
}

onMounted(async () => {
  await reloadProfile();
});

function changePassword(values) {
  btnLoading.value = true;
  const frmData = new FormData();
  frmData.append("old_password", values.old_password);
  frmData.append("password", values.password);
  frmData.append("password_confirmation", values.password_confirmation);

  $api
    .post("/profile/change_password", frmData)
    .then((res) => {
      openSuccessModal.value = true;
      setTimeout(() => {
        openSuccessModal.value = false;
        openModal.value = false;
      }, 2000);
      toast.success(res.data?.message || t("STATUS.success"));
    })
    .catch((e) => {
      toast.error(e?.response?.data?.message || t("STATUS.error"));
    })
    .finally(() => {
      btnLoading.value = false;
    });
}
</script>

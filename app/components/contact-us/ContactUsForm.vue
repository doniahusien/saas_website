<template>
  <div class="container mx-auto mt-5 rounded-2xl bg-website-white pe-0">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div class="flex flex-col p-5 items-start justify-center space-y-4">
        <h2 class="text-4xl font-bold capitalize lg:text-6xl">
          {{ $t("TITLES.contact us") }}
        </h2>
        <p class="capitalize text-third">
          {{ $t("LABELS.contatDesc") }}
        </p>
        <VeeForm
          @submit="handleSubmit"
          :validation-schema="schema"
          class="w-full space-y-5"
          aria-autocomplete="none"
        >
          <InputsBaseInput
            id="full_name"
            name="full_name"
            :placeholder="$t('LABELS.fullname')"
            type="text"
          />
          <InputsPhoneInput
            codeName="phone_code"
            phoneName="phone"
            :placeholder="$t('LABELS.phone')"
          />
          <InputsSelect
            id="message_type"
            name="message_type"
            :options="message_types"
            :placeholder="$t('LABELS.choose type of message')"
            :model-value="selectedMessage"
          />
          <InputsBaseInput
            id="message"
            name="message"
            :placeholder="$t('LABELS.enterYourMessage')"
            type="textarea"
            rows="10"
          />
          <button
            :disabled="loading"
            type="submit"
            class="base-btn text-lg ms-auto mt-7 w-fit px-12 py-5"
          >
            {{ $t("BUTTONS.send message") }}
            <Icon
              :name="$i18n.locale == 'en' ? 'mdi:arrow-right' : 'mdi:arrow-left'"
              class="size-6"
            />
          </button>
        </VeeForm>
      </div>
      <div class="relative">
        <div class="absolute -top-9 end-1 z-30" v-if="appStore.settingsData">
          <div
            class="phoneContainer contactContent flex min-h-17.5 rounded-4xl bg-primary p-3 transition-all duration-500 ease-in hover:ps-8 group"
          >
            <div
              class="hidden w-50 space-y-3 ps-2 text-website-white transition-all duration-500 ease-in"
            >
              <p class="font-bold text-lg">{{ $t("FOOTER.call center") }}</p>
              <div v-if="appStore.settingsData" class="space-y-1">
                <div
                  v-for="phone in appStore.settingsData.contact_us?.phone_number"
                  :key="phone.id"
                >
                  <a
                    :href="`tel:${phone.phone_code + phone.phone}`"
                    class="flex flex-wrap items-center gap-2"
                  >
                    <img :src="phone.flag" alt="flag" class="size-6" />
                    ({{ phone.phone_code }})
                    {{ phone.phone }}
                  </a>
                </div>
              </div>
            </div>
            <div
              class="flex size-14 items-center justify-center rounded-full bg-website_white"
            >
              <div class="rounded-full bg-white size-14 flex items-center justify-center">
                <Icon name="mdi:phone" class="size-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
        <contact-map :locations="locations" class="h-full wow fadeInRight" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import * as yup from "yup";
import { configure } from "vee-validate";
import { useToast } from "vue-toastification";
const appStore = useAppStore();
const toast = useToast();
const { $api } = useNuxtApp();
const { t } = useI18n();
const loading = ref(false);
const selectedMessage = ref("");
const message_types = [
  {
    id: "complaint",
    name: t("LABELS.complaint"),
  },
  {
    id: "suggestion",
    name: t("LABELS.suggestion"),
  },
  {
    id: "inquiry",
    name: t("LABELS.inquiry"),
  },
  {
    id: "other",
    name: t("LABELS.other"),
  },
];

defineProps({
  locations: {
    required: true,
  },
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = yup.object().shape({
  full_name: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.fullname") })),
  phone: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.phone") }))
    .test((value, context) => {
      let parent =
        context.parent.phone_code?.phone_limit ||
        context.parent.phone_code?.phone_code?.phone_limit;
      if (value.toString().length > parent || value.toString().length < parent) {
        return context.createError({
          message: t("ERRORS.phoneLength", { value: parent }),
          path: context.path,
        });
      } else {
        return true;
      }
    })
    .nullable(),
  phone_code: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.phoneCode") })),
  message_type: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.message_type") })),
  message: yup.string().required(t("ERRORS.isRequired", { name: t("LABELS.message") })),
});

function handleSubmit(values, actions) {
  const frmData = new FormData();
  frmData.append("full_name", values.full_name);
  frmData.append("phone", values.phone);
  frmData.append("phone_code", values.phone_code);
  frmData.append("message_type", values.message_type);
  frmData.append("message", values.message);
  loading.value = true;
  $api
    .post("contact_us", frmData)
    .then((res) => {
      actions.resetForm();

      selectedMessage.value = null;
      setTimeout(() => toast.success(res.data.message), 300);
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      toast.error(e.response.data.message);
    })
    .finally(() => {
      selectedMessage.value = "";
    });
}
</script>

<style>
.phoneContainer:hover div {
  @apply flex flex-col;
}
</style>

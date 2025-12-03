<template>
  <div class="text-end" :class="inEdit ? '' : 'mt-auto'">
    <div
      class="flex flex-wrap justify-end gap-2 text-lg font-semibold"
      :class="inEdit ? '' : 'mb-3 px-4'"
    >
      <button v-if="inEdit" type="button" @click="openEdit">
        <div class="stroke-text-third mt-1">
          <nuxt-icon name="edit" class="text-2xl text-third" />
        </div>
      </button>
      <button
        v-else
        type="button"
        class="base-btn w-full"
        @click="openAddModal"
      >
        {{ t("BUTTONS.addNewAddress") }}
        <span
          v-if="hasAddIcon"
          class="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-website_white text-primary"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="text-sm" />
        </span>
      </button>
    </div>

    <teleport to="body">
      <div class="relative">
        <general-modal
          v-if="addressModal"
          :persist="true"
          classes="!w-full md:!max-w-[700px]"
          :title="inEdit ? t('BUTTONS.editAddress') : t('BUTTONS.addNewAddress')"
          @close="closeModal"
        >
          <VeeForm
            :key="formKey"
            as="div"
            :initial-values="{ ...initialValues }"
            :validation-schema="schema"
            @submit="handleSubmit"
          >
            <form class="w-100 mx-auto md:max-w-[700px]" aria-autocomplete="none">
              <div class="mb-4 flex items-start gap-1">
                <input
                  class="text-text-light"
                  type="checkbox"
                  id="rememberMe"
                  v-model="initialValues.is_default"
                />
                <label for="rememberMe" class="text-text-light">
                  {{ t("LABELS.Default address") }}
                </label>
              </div>

              <div class="w-full">
                <address-map
                  id="address"
                  name="address"
                  :label="t('LABELS.address')"
                  :placeholder="t('LABELS.enterYour', { name: t('LABELS.address') })"
                  :location="initialValues"
                  @setLocation="handleLocation"
                />
              </div>

              <InputsBaseInput
                id="title"
                name="title"
                :label="t('LABELS.title')"
                :placeholder="t('LABELS.enterYour', { name: t('LABELS.title') })"
              />

              <InputsBaseInput
                id="building"
                name="building"
                type="number"
                :label="t('LABELS.buildingNo')"
                :placeholder="
                  t('LABELS.enterYour', { name: t('LABELS.buildingNo') })
                "
              />

              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <InputsBaseInput
                  id="floorNo"
                  name="floorNo"
                  type="number"
                  :label="t('LABELS.floorNo')"
                  :placeholder="
                    t('LABELS.enterYour', { name: t('LABELS.floorNo') })
                  "
                />
                <InputsBaseInput
                  id="apartment"
                  name="apartment"
                  type="number"
                  :label="t('LABELS.apartment')"
                  :placeholder="
                    t('LABELS.enterYour', { name: t('LABELS.apartment') })
                  "
                />
              </div>

              <button
                :disabled="loading"
                type="submit"
                class="base-btn ms-auto mt-5 w-full py-3 2xl:mt-11"
              >
                {{ t("BUTTONS.save") }}
              </button>
            </form>
          </VeeForm>

          <general-modal-success
            v-if="openSuccessModal"
            :persist="true"
            :title="inEdit ? t('BUTTONS.editAddress') : t('BUTTONS.addNewAddress')"
            :message="successMessage"
            @close="openSuccessModal = false"
          />
        </general-modal>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

const props = defineProps({
  inEdit: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    required: false,
  },
  hasAddIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["reload"]);
const { t } = useI18n();
const { $api } = useNuxtApp();
const toast = useToast();
const appAuth = useAppAuth();

const successMessage = ref("");
const addressModal = ref(false);
const loading = ref(false);
const openSuccessModal = ref(false);

const initialValues = reactive({
  is_default: false,
  title: "",
  address: "",
  building: "",
  floorNo: "",
  apartment: "",
  lat: "",
  lng: "",
});
const formKey = ref(0);

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = yup.object().shape({
  title: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.title") })),
  address: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.address") })),
  building: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.buildingNo") }))
    .test(
      "Is positive?",
      t("ERRORS.moreThan0", { name: t("LABELS.buildingNo") }),
      (value) => Number(value) > 0
    ),
  floorNo: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.floorNo") }))
    .test(
      "Is positive?",
      t("ERRORS.moreThan0", { name: t("LABELS.floorNo") }),
      (value) => Number(value) > 0
    ),
  apartment: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.apartment") }))
    .test(
      "Is positive?",
      t("ERRORS.moreThan0", { name: t("LABELS.apartment") }),
      (value) => Number(value) > 0
    ),
  lat: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.address") })),
  lng: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.address") })),
});

const refreshForm = () => {
  formKey.value += 1;
};

const resetForm = () => {
  initialValues.is_default = false;
  initialValues.title = "";
  initialValues.address = "";
  initialValues.building = "";
  initialValues.floorNo = "";
  initialValues.apartment = "";
  initialValues.lat = "";
  initialValues.lng = "";
  refreshForm();
};

const populateForm = (item) => {
  if (!item) return;
  initialValues.title = item.title ?? "";
  initialValues.address = item.desc ?? "";
  initialValues.building = item.building ?? "";
  initialValues.apartment = item.apartment ?? "";
  initialValues.floorNo = item.floor ?? "";
  initialValues.is_default = Boolean(item.is_default);
  initialValues.lat = item.lat ? Number(item.lat) : "";
  initialValues.lng = item.lng ? Number(item.lng) : "";
  refreshForm();
};

watch(
  () => props.item,
  (value) => {
    if (props.inEdit && value) {
      populateForm(value);
    }
  },
  { deep: true }
);

const openAddModal = () => {
  resetForm();
  addressModal.value = true;
};

const openEdit = () => {
  if (!props.inEdit || !props.item) return;
  populateForm(props.item);
  addressModal.value = true;
};

const closeModal = () => {
  addressModal.value = false;
};

const handleLocation = (coords) => {
  if (!coords) return;
  initialValues.lat = coords.lat;
  initialValues.lng = coords.lng;
};

const buildFormData = (values) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("desc", values.address);
  formData.append("building", values.building);
  formData.append("floor", values.floorNo);
  formData.append("apartment", values.apartment);
  formData.append("is_default", +initialValues.is_default);
  formData.append("lat", values.lat);
  formData.append("lng", values.lng);
  if (props.inEdit && props.item?.id) {
    formData.append("_method", "PATCH");
  }
  return formData;
};

const handleSubmit = (values) => {
  loading.value = true;
  const formData = buildFormData(values);
  const url = props.inEdit && props.item?.id ? `/address/${props.item.id}` : "/address";

  $api
    .post(url, formData)
    .then((res) => {
      appAuth.getProfile();
      successMessage.value = res.data?.message ?? t("TITLES.success");
      openSuccessModal.value = true;
      emit("reload");
      setTimeout(() => {
        addressModal.value = false;
        openSuccessModal.value = false;
      }, 2000);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || t("ERRORS.somethingWrong"));
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>


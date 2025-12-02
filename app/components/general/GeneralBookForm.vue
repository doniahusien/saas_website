<template>
      <div class="text-center">
        <p class="font-allura text-3xl md:text-5xl">
          {{ $t("reservation.subtitle") }}
        </p>
        <h3 class="text-3xl md:text-5xl font-bold">
          {{ $t("reservation.heading") }}
        </h3>
      </div>

      <VeeForm @submit="handleSubmit" :validation-schema="schema" class="space-y-16 mx-auto w-full md:w-2/3 ">
        <template v-slot="{ errors }">

          <div>
            <VeeField
              name="name"
              type="text"
              class="w-full font-medium placeholder:text-black pb-2.5 bg-transparent focus:outline-none border-b"
              :class="errors.name ? 'border-red-500' : 'border-white'"
              :placeholder="$t('reservation.namePlaceholder')"
            />
            <VeeErrorMessage name="name" class="text-red-500 text-sm mt-1" />
          </div>

          <inputsPhoneInput
            :isRes="true"
            codeName="phone_code"
            phoneName="phone"
            :placeholder="t('auth.phone')"
            v-model:code="phone_code"
            v-model:phone="phone"
            @country-selected="onCountrySelected"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <VeeField
                name="persons"
                type="text"
                class="w-full font-medium placeholder:text-black pb-2.5 bg-transparent focus:outline-none border-b"
                :class="errors.persons ? 'border-red-500' : 'border-white'"
                :placeholder="$t('reservation.persons')"
              />
              <VeeErrorMessage name="persons" class="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <div
                @click="openAddressModal = true"
                :class="[
                  'w-full font-medium placeholder:text-black pb-2.5 bg-transparent focus:outline-none border-b',
                  errors.branch ? 'border-red-500' : 'border-white'
                ]"
              >
                {{ selectedBranch?.name || $t("reservation.selectBranch") }}
              </div>
              <VeeErrorMessage name="branch" class="text-red-500 text-sm mt-1" />
            </div>
          </div>

          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <inputsTimePicker name="timeTo" :placeholder="$t('reservation.timeTo')" />
            <inputsTimePicker name="timeFrom" :placeholder="$t('reservation.timeFrom')" />
          </div>

          <div>
            <inputsDatePicker name="date" :placeholder="$t('reservation.date')" />
          </div>

          <div class="flex justify-center md:justify-end">
            <button
              :disabled="btnLoading"
              type="submit"
              class="px-6 py-3 cursor-pointer bg-btn text-white rounded-full hover:bg-btn/80 transition disabled:opacity-60"
            >
              <span v-if="!btnLoading">{{ $t("reservation.submit") }}</span>
              <span v-else>{{ $t("BUTTONS.loading") || "Loading..." }}</span>
            </button>
          </div>

        </template>
      </VeeForm>

      <ModalAddressModal
        v-model="openAddressModal"
        @select="handleBranchSelect"
      />
</template>


<script setup lang="ts">
import { object, string, date } from "yup";

import * as yup from "yup";

import { useToast, POSITION } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

const { t } = useI18n();
const { $api } = useNuxtApp();
const toast = useToast();
const appAuth = useAppAuth();
const userData = computed(() => appAuth.getUserData);
const btnLoading = ref(false);
const phone_code = ref("");
const phone = ref("");

const phoneLimit = ref(null);
function onCountrySelected(country) {
  phoneLimit.value = country?.phone_limit || null;
}

const schema = object({
  name: string().required(t("validation.name_required")),
  persons: string().required(t("validation.persons_required")),
  phone_code: string().required(t("auth.phoneCodeRequired")),

  phone: string()
    .required(t("auth.phoneRequired"))
    .matches(/^[0-9]+$/, t("auth.invalidPhone"))
    .test(
      "phone-limit",
      phoneLimit.value
        ? t("auth.phoneLimit", { limit: phoneLimit.value })
        : t("auth.invalidPhone"),
      function (value) {
        if (!value) return false;
        if (!phoneLimit.value) return true;
        return value.length === phoneLimit.value;
      }
    ),
  timeFrom: yup
    .mixed()
    .test("required", t("validation.time_from_required"), (value) => !!value),

  timeTo: yup
    .mixed()
    .test("required", t("validation.time_to_required"), (value) => !!value),
  date: yup
    .mixed()
    .transform((value) => (value ? new Date(value) : null))
    .test("required", t("validation.date_required"), (value) => !!value),
});

const openAddressModal = ref<boolean>(false);
const selectedBranch = ref<Branch | null>(null);

const openSuccessModal = ref(false);
const reservationId = ref<number | null>(null);

const handleBranchSelect = (branch: Branch) => {
  selectedBranch.value = branch;
  openAddressModal.value = false;
};

function formatTime(value: any): string {
  if (!value) return "";

  if (typeof value === "object" && "hours" in value && "minutes" in value) {
    const hours24 = value.hours;
    const minutes = value.minutes;

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;

    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  }

  if (value instanceof Date && !isNaN(value.getTime())) {
    const hours24 = value.getHours();
    const minutes = value.getMinutes();

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;

    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  }

  return "";
}

async function createReservation(formData: FormData) {
  try {
    const res = await $api.post("reservations", formData);
    return res;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || "Request failed";
    throw Object.assign(err, { message });
  }
}

const handleSubmit = async (values: any, actions: any) => {
  if (!selectedBranch.value) {
    alert("Please select a branch");
    return;
  }

  btnLoading.value = true;
  const SUBMITDATA = new FormData();
  SUBMITDATA.append("name", values.name);
  SUBMITDATA.append("phone", values.phone);
  SUBMITDATA.append("store_id", String(selectedBranch.value.id));
  SUBMITDATA.append("phone_code", values.phone_code);
  const dateStr = values.date
    ? values.date instanceof Date
      ? values.date.toISOString().split("T")[0]
      : String(values.date)
    : "";
  SUBMITDATA.append("date", dateStr);
  const fromTimeStr = formatTime(values.timeFrom);
  const toTimeStr = formatTime(values.timeTo);

  SUBMITDATA.append("from_time", fromTimeStr);
  SUBMITDATA.append("to_time", toTimeStr);
  SUBMITDATA.append("guests_number", String(values.persons));
  try {
    const res = await createReservation(SUBMITDATA);
    console.log("Raw timeFrom:", values.timeFrom);
    console.log("Raw timeTo:", values.timeTo);
    btnLoading.value = false;
    reservationId.value = res.data?.data?.id;
    actions.resetForm();
    selectedBranch.value = null;
    openAddressModal.value = false;
    toast.success(res.data?.message || "Reservation created");
    openSuccessModal.value = true;
  } catch (err: any) {
    btnLoading.value = false;
    actions.resetForm();
    selectedBranch.value = null;
    toast.error(err.message || "Request failed", {
      timeout: 2000,
      position:
        (useI18n() as any).locale.value == "en"
          ? POSITION.BOTTOM_RIGHT
          : POSITION.BOTTOM_LEFT,
    });
  }
};
</script>

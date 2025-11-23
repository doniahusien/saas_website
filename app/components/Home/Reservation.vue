<template>
  <div class="container mx-auto space-y-10 px-6 md:px-0">
    <div class="flex items-center gap-2">
      <span class="text-btn">{{ $t("reservation.eyebrow") }}</span>
      <div class="flex-none w-22 h-px bg-btn"></div>
    </div>

    <h2 class="text-2xl md:text-3xl lg:text-5xl font-bold">
      {{ $t("reservation.title") }}
    </h2>

    <div
      class="bg-[url('/images/bg/reservation.png')] bg-cover bg-center rounded-xl shadow-lg p-8 md:p-12"
    >
      <div class="w-2/3 mx-auto space-y-16">
        <div class="text-center">
          <p class="font-allura text-3xl md:text-5xl">
            {{ $t("reservation.subtitle") }}
          </p>
          <h3 class="text-3xl md:text-5xl font-bold">
            {{ $t("reservation.heading") }}
          </h3>
        </div>
        <VeeForm @submit="handleSubmit" :validation-schema="schema" class="space-y-8">
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
                    errors.branch ? 'border-red-500' : 'border-white',
                  ]"
                >
                  {{ selectedBranch?.name || $t("reservation.selectBranch") }}
                </div>
                <VeeErrorMessage name="branch" class="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <inputsTimePicker name="timeTo" :placeholder="$t('reservation.timeTo')" />
              <inputsTimePicker
                name="timeFrom"
                :placeholder="$t('reservation.timeFrom')"
              />
            </div>

            <div>
              <inputsDatePicker name="date" placeholder="date" />
            </div>
            <div class="flex justify-center md:justify-end">
              <button
                type="submit"
                class="px-6 py-3 cursor-pointer bg-btn text-white rounded-full hover:bg-btn/80 transition"
              >
                {{ $t("reservation.submit") }}
              </button>
            </div>
          </template>
        </VeeForm>
        <ModalAddressModal v-model="openAddressModal" @select="handleBranchSelect" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, date } from "yup";

import * as yup from "yup";

const { t } = useI18n();

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

const handleBranchSelect = (branch: Branch) => {
  selectedBranch.value = branch;
  openAddressModal.value = false;
};

const handleSubmit = (values: any) => {
  if (!selectedBranch.value) {
    alert("Please select a branch");
    return;
  }

  const finalData = {
    ...values,
    branch: selectedBranch.value.name,
  };

  console.log("Reservation Details:", finalData);
};
</script>

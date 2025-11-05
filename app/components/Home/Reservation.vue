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
      <div class="w-full md:w-3/4 lg:w-1/2 mx-auto space-y-16">
        <div class="text-center">
          <p class="font-allura text-3xl md:text-5xl">
            {{ $t("reservation.subtitle") }}
          </p>
          <h3 class="text-3xl md:text-5xl font-bold">
            {{ $t("reservation.heading") }}
          </h3>
        </div>

        <VeeForm @submit="handleSubmit" :validation-schema="schema" class="space-y-10">
          <div>
            <VeeField
              name="name"
              type="text"
              class="w-full border-b border-btn bg-transparent focus:outline-none focus:border-btn"
              :placeholder="$t('reservation.namePlaceholder')"
            />
            <VeeErrorMessage name="name" class="text-red-500 text-xs mt-1" />
          </div>

          <div>
            <VeeField
              name="phone"
              type="tel"
              class="w-full border-b border-btn bg-transparent focus:outline-none focus:border-btn"
              :placeholder="$t('reservation.phonePlaceholder')"
            />
            <VeeErrorMessage name="phone" class="text-red-500 text-xs mt-1" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <VeeField
                as="select"
                name="persons"
                class="w-full border-b border-btn bg-transparent focus:outline-none focus:border-btn"
              >
                <option disabled value="">{{ $t("reservation.selectPersons") }}</option>
                <option>{{ $t("reservation.person1") }}</option>
                <option>{{ $t("reservation.person2") }}</option>
                <option>{{ $t("reservation.person3") }}</option>
                <option>{{ $t("reservation.person4plus") }}</option>
              </VeeField>
              <VeeErrorMessage name="persons" class="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <VeeField
                as="select"
                name="branch"
                class="w-full border-b border-btn bg-transparent focus:outline-none focus:border-btn"
              >
                <option disabled value="">{{ $t("reservation.selectBranch") }}</option>
                <option>{{ $t("reservation.branchCairo") }}</option>
                <option>{{ $t("reservation.branchAlex") }}</option>
                <option>{{ $t("reservation.branchGiza") }}</option>
              </VeeField>
              <VeeErrorMessage name="branch" class="text-red-500 text-xs mt-1" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TimePicker name="timeTo" :placeholder="$t('reservation.timeTo')" />
            <TimePicker name="timeFrom" :placeholder="$t('reservation.timeFrom')" />
          </div>

          <div>
            <DatePicker name="date" placeholder="date" />
          </div>

          <div class="flex justify-center md:justify-end pt-6">
            <button
              type="submit"
              class="px-6 py-2 bg-btn text-white rounded-full hover:bg-btn/80 transition"
            >
              {{ $t("reservation.submit") }}
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, date } from "yup";

const schema = object({
  name: string().required("Name is required"),
  phone: string().required("Phone is required"),
  persons: string().required("Please select number of persons"),
  branch: string().required("Please select branch"),
  from: string().required("Please select start time"),
  to: string().required("Please select end time"),
  date: date().required("Please select a date"),
});

const handleSubmit = (values: any) => {
  console.log("Reservation Details:", values);
};
</script>

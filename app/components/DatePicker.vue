<template>
  <div>
    <VueDatePicker
      v-model="internalValue"
      :locale="dateFnsLocale"
      :month-picker="mode === 'month'"
      :year-picker="mode === 'year'"
      :enable-time-picker="false"
      auto-apply
      :min-date="minDate"
      :placeholder="placeholder"
      input-class="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-btn"
    />
    <VeeErrorMessage :name="name" class="text-red-500 text-xs mt-1" />
  </div>
</template>

<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import en from "date-fns/locale/en-US";
import ar from "date-fns/locale/ar";

const props = defineProps({
  name: { type: String, required: true },
  mode: { type: String, default: "date" }, 
  placeholder: { type: String, default: "Select date" },
  minDate: { type: Date, default: () => new Date() },
});

const { locale } = useI18n();

const dateFnsLocale = computed(() => {
  return locale.value === "ar" ? ar : en;
});

const { value: internalValue } = useField(props.name);
</script>

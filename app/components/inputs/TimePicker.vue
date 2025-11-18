<template>
  <div>
    <VueDatePicker
      v-model="internalValue"
      time-picker
      :locale="dateFnsLocale"
      auto-apply
      :placeholder="placeholder"
      :class="['w-full placeholder:text-black datepicker-wrapper', { 'datepicker-checkout': props.checkout }]"
      input-class="datepicker-input"
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
  placeholder: { type: String, default: "Select time" },
  checkout: { type: Boolean, default: false },
});
const checkout = props.checkout;

const { locale } = useI18n();
const dateFnsLocale = computed(() => (locale.value === "ar" ? ar : en));
const { value: internalValue } = useField(props.name);
</script>

<style scoped>
.datepicker-wrapper :deep(.dp__input) {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--color-btn, #c49a6c);
  outline: none;
  color: rgb(17 24 39);
  padding-block: 0.5rem;
  transition: border-color 0.2s ease-in-out;
}

.datepicker-wrapper :deep(.dp__input:focus) {
  border-color: var(--color-btn, #c49a6c);
}
.datepicker-wrapper :deep(.dp__input::placeholder) {
  color: black !important;
  opacity: 1; 
}

/* Checkout-specific styles */
.datepicker-checkout :deep(.dp__input) {
  width: 100%;
  background: white;
  border: 0;
  outline: none;
  color: rgb(17 24 39);
  padding-block: 0.75rem;
  font-weight: 600;
  transition: border-color 0.2s ease-in-out, padding 0.2s;
}
.datepicker-checkout :deep(.dp__input:focus) {
  border-color: var(--color-btn, #a9743f);
}
.datepicker-checkout :deep(.dp__input::placeholder) {
  color: rgb(107 114 128) !important;
  opacity: 1;
}
</style>

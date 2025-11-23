<template>
  <div class="relative">
    <VueDatePicker
      v-model="internalValue"
      time-picker
      :locale="dateFnsLocale"
      auto-apply
      :placeholder="placeholder"
      class="w-full datepicker-wrapper"
      :class="[{ 'datepicker-checkout': props.checkout }]"
      input-class="datepicker-input"
    >
      <template #input-icon>
        <Icon name="mdi:clock-outline" class="text-white text-xl" />
      </template>
    </VueDatePicker>
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
  font-weight: 600;
  padding-left: 0;
  background: transparent;
  border: 0;
  border-bottom: 1px solid white;
  outline: none;
  color: rgb(17 24 39);
  transition: border-color 0.2s ease-in-out;
}

/* .datepicker-wrapper :deep(.dp__input:focus) {
  border-color: var(--color-btn, #c49a6c);
}
 */
.datepicker-wrapper :deep(.dp__input::placeholder) {
  color: black !important;
  opacity: 1;
}

.datepicker-wrapper :deep(.dp__input_icon) {
  right: 0 !important;
  left: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.datepicker-checkout :deep(.dp__input) {
  background: white;
  border: 0;
  outline: none;
  color: rgb(17 24 39);
  padding-block: 0.75rem;
  font-weight: 600;
}

.datepicker-checkout :deep(.dp__input::placeholder) {
  color: rgb(107 114 128) !important;
}
</style>

<template>
  <div class="relative">
    <VueDatePicker
      v-model="internalValue"
      :locale="dateFnsLocale"
      time-picker
      auto-apply
      :placeholder="placeholder"
      class="w-full datepicker-wrapper"
      :class="[{ 'datepicker-checkout': props.checkout }, isError ? 'datepicker-error' : '']"
      input-class="datepicker-input"
    >
      <template #input-icon>
        <Icon
          :name="props.checkout ? 'uil:clock' : 'mdi:clock-outline'"
          :class="[
            'pointer-events-none transition-all',
            props.checkout
              ? 'size-6 text-white absolute start-3 top-1/2 -translate-y-1/2 z-10'
              : 'size-5 text-white'
          ]"
        />
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

const { locale } = useI18n();
const dateFnsLocale = computed(() => (locale.value === "ar" ? ar : en));
const { value: internalValue, meta } = useField(props.name);
const isError = computed(() => meta.touched && !meta.valid);

</script>

<style scoped>
.datepicker-wrapper :deep(.dp__input) {
  width: 100%;
  padding-left: 0;
  padding-right: 2.5rem;
  font-weight: 600;
  background: transparent;
  border: 0;
  border-bottom: 1px solid white;
  outline: none;
  color: rgb(17 24 39);
  padding-block: 0.5rem;
  transition: border-color 0.2s ease-in-out;
}

.datepicker-wrapper :deep(.dp__input::placeholder) {
  color: black !important;
  opacity: 1;
}

.datepicker-wrapper :deep(.dp__input_icon) {
  right: 0.5rem !important;
  left: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.datepicker-checkout :deep(.dp__input) {
  width: 100%;
  background: #EFF0F1;
  border-radius: 0.5rem;
  outline: none;
  color: rgb(17 24 39);
  padding: 1.2rem 1rem 1.2rem 3rem !important; 
  font-weight: 600;
  transition: all 0.2s;
}

.datepicker-checkout :deep(.dp__input:focus) {
  border: 2px solid var(--color-primary, #a9743f);
  box-shadow: 0 0 0 4px rgba(169, 116, 63, 0.15);
}

.datepicker-checkout :deep(.dp__input::placeholder) {
  color: rgb(107 114 128) !important;
  opacity: 1;
}

.datepicker-checkout :deep(.dp__input_icon) {
  left: 0.75rem !important;
  right: auto !important;
  top: 50%;
  transform: translateY(-50%);
}

.datepicker-error :deep(.dp__input) {
  border-color: #ef4444 !important;
}
</style>
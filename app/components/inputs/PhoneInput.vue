<template>
  <div class="flex items-center gap-2 phone-input text-placeholder">
    <select
      v-model="selectedCode"
      class="border border-placeholder rounded-lg p-2 bg-transparent focus:outline-none focus:ring focus:ring-placeholder text-sm"
    >
      <option v-for="country in countries" :key="country.code" :value="country.dial_code">
        {{ country.dial_code }}
      </option>
    </select>

    <input
      type="tel"
      v-model="phoneNumber"
      :placeholder="placeholder"
      class="flex-2 border border-placeholder rounded-lg p-2 focus:outline-none focus:ring focus:ring-placeholder text-sm"
    />

    <input type="hidden" :value="fullPhone" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Phone",
  },
});

const emit = defineEmits(["update:modelValue"]);

const phoneNumber = ref("");
const selectedCode = ref("+1");

const countries = [
  { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
  { name: "Saudi Arabia", code: "SA", dial_code: "+966", flag: "🇸🇦" },
  { name: "Egypt", code: "EG", dial_code: "+20", flag: "🇪🇬" },
  { name: "United Arab Emirates", code: "AE", dial_code: "+971", flag: "🇦🇪" },
];

const fullPhone = computed(() => `${selectedCode.value}${phoneNumber.value}`);

watch([selectedCode, phoneNumber], () => {
  emit("update:modelValue", fullPhone.value);
});
</script>

<style scoped>
.phone-input select {
  min-width: 160px;
}
</style>

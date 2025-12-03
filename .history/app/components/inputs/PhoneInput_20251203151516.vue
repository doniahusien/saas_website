<template>
  <div class="w-full flex flex-row items-center gap-2">
    <VeeField :name="codeName" v-model="selectedCode">
      <div class="relative w-24">
        <select
          v-model="selectedCode"
          @change="onCodeChange"
          @focus="isOpen = true"
          @blur="isOpen = false"
          :disabled="disabled"
          class="appearance-none w-full bg-transparent h-14 pb-2 pr-8 font-medium focus:outline-none transition-all disabled:cursor-not-allowed"
          :class="[
            isRes ? 'placeholder:text-black' : 'input',
            errorCode ? 'border-b-2 border-red-500' : 'border-b-2 border-white',
            disabled ? 'text-gray-700 border-b-2 border-gray-400' : 'text-black'
          ]"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.phone_code"
          >
            +{{ country.phone_code }}
          </option>
        </select>

        <span
          class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          :class="{ 'opacity-50': disabled }"
        >
          <Icon :name="isOpen && !disabled ? 'fe:arrow-up' : 'fe:arrow-down'" />
        </span>
        <VeeErrorMessage :name="codeName" class="absolute top-full left-0 text-red-500 text-xs mt-0.5 whitespace-nowrap" />
      </div>
    </VeeField>
    <VeeField :name="phoneName" v-model="phoneValue">
      <div class="flex-1 relative">
        <input
          :value="phoneValue"
          @input="phoneValue = $event.target.value"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="disabled"
          class="w-full bg-transparent h-14 font-medium focus:outline-none transition-all disabled:cursor-not-allowed"
          :class="[
            isRes ? 'placeholder:text-black' : 'input',
            errorPhone ? 'border-b-2 border-red-500' : 'border-b-2 border-white',
            disabled ? 'text-gray-700 border-b-2 border-gray-400' : 'text-black'
          ]"
        />
        <VeeErrorMessage :name="phoneName" class="absolute top-full left-0 text-red-500 text-xs mt-0.5 whitespace-nowrap" />
      </div>
    </VeeField>
  </div>
</template>

<script setup>
import { Field as VeeField, ErrorMessage as VeeErrorMessage } from "vee-validate";

const props = defineProps({
  codeName: { type: String, required: true },
  phoneName: { type: String, required: true },
  code: { type: String, default: "" },
  phone: { type: String, default: "" },
  placeholder: { type: String, default: "Phone" },
  isRes: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits([
  "update:code",
  "update:phone",
  "country-selected",
]);

const isOpen = ref(false);
const selectedCode = ref("");
const phoneValue = ref("");          
const countries = ref([]);

const errorCode = computed(() => {
  const errors = useFieldError(props.codeName);
  return errors.value;
});
const errorPhone = computed(() => {
  const errors = useFieldError(props.phoneName);
  return errors.value;
});


watch(() => props.code, (val) => {
  if (val && selectedCode.value !== val) selectedCode.value = val;
}, { immediate: true });


watch(() => props.phone, (val) => {
  if (val !== undefined && phoneValue.value !== val) {
    phoneValue.value = val || "";
  }
}, { immediate: true });


function onCodeChange() {
  emit("update:code", selectedCode.value);
  const country = countries.value.find(c => c.phone_code === selectedCode.value);
  if (country) emit("country-selected", country);
}

watch(phoneValue, (newVal) => {
  if (!props.disabled) {
    emit("update:phone", newVal);
  }
});


const { $api } = useNuxtApp();
onMounted(async () => {
  try {
    const { data } = await $api.get("/brand_country");
    countries.value = data?.data || [];

    if (!selectedCode.value && countries.value.length) {
      selectedCode.value = props.code || countries.value[0].phone_code;
    }
  } catch (err) {
    console.error("Failed to load countries", err);
  }
});
</script>

<style scoped>
input:disabled,
select:disabled {
  -webkit-text-fill-color: currentColor;
  background: transparent;
  /* Ensure a visible bottom border when disabled */
  border: 2px solid #9ca3af; /* tailwind gray-400 */
}
</style>
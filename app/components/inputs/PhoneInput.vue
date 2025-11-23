<template>
  <div class="w-full flex flex-row items-center gap-3">
    <VeeField :name="codeName" v-model="selectedCode" v-slot="{ field: codeField, meta: codeMeta, errors: codeErrors }">
      <div class="relative" style="width: 5.5rem; min-width: 4.5rem;">
        <select
          v-bind="codeField"
          v-model="selectedCode"
          @change="onSelectCountry($event, codeField)"
          :class="[
            isRes ? 'w-full placeholder:text-black border-b font-medium pb-2 bg-transparent focus:outline-none' : 'input',
            (!codeMeta.valid && codeMeta.touched) || codeErrors.length ? 'border-red-500' : 'border-white'
          ]"
        >
          <option
            v-for="(country, i) in countries"
            :key="country.id"
            :value="country.phone_code"
          >
            +{{ country.phone_code }}
          </option>
        </select>
        <VeeErrorMessage :name="codeName" as="div" class="text-red-500 text-sm mt-1" />
      </div>
    </VeeField>
    <VeeField :name="phoneName" v-slot="{ field: phoneField, meta: phoneMeta, errors: phoneErrors }">
      <div class="flex-1">
        <input
          v-bind="phoneField"
          type="text"
          :placeholder="placeholder"
          @input="emit('update:phone', $event.target.value)"
          :class="[
            isRes ? 'w-full font-medium placeholder:text-black border-b pb-2 bg-transparent focus:outline-none' : 'input',
            (!phoneMeta.valid && phoneMeta.touched) || phoneErrors.length ? 'border-red-500' : 'border-white'
          ]"
        />
        <VeeErrorMessage :name="phoneName" as="p" class="text-red-500 text-sm mt-1" />
      </div>
    </VeeField>
  </div>
</template>
<script setup>
import { Field as VeeField, ErrorMessage as VeeErrorMessage } from "vee-validate";
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  codeName: { type: String, required: true },
  phoneName: { type: String, required: true },
  code: { type: String, default: null },
  modelValueCode: { type: String, default: null },
  phone: { type: String, default: null },
  modelValuePhone: { type: String, default: null },
  placeholder: { type: String, default: "Phone" },
  isRes:{type:Boolean,default:false}
});

const emit = defineEmits(["update:code", "update:phone", "country-selected"]);

const selectedCode = ref(props.code ?? props.modelValueCode ?? "");

function onSelectCountry(e, codeField = null) {
  const code = e.target.value;
  selectedCode.value = code;
  if (codeField && typeof codeField.value !== 'undefined') {
    codeField.value = code;
  }
}

watch(selectedCode, (code) => {
  if (!code) return;
  emit("update:code", code);
  const selected = countries.value.find((c) => c.phone_code == code);
  if (selected) emit("country-selected", selected);
});
const { $api } = useNuxtApp();
const countries = ref([]);

onMounted(async () => {
  try {
    const res = await $api.get("/brand_country");
    countries.value = res.data?.data || [];

    if (countries.value.length) {
      if (!selectedCode.value) selectedCode.value = countries.value[0].phone_code;
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<style scoped>

</style>

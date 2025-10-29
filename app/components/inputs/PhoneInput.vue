<template>
  <div class="w-full">
    <VeeField :name="phoneName" v-slot="{ meta }">
      <div class="input_wrapper flex flex-col">
        <div class="flex items-center gap-3">
          <VeeField :name="codeName" v-slot="{ field: codeField, meta: codeMeta }">
            <div
              class="relative w-20 md:w-28"
              :class="{ error: !codeMeta.valid && codeMeta.touched }"
            >
              <select
                v-bind="codeField"
                @change="emit('update:code', $event.target.value)"
                class="w-full border border-placeholder text-placeholder rounded-lg px-2 py-3 bg-transparent text-sm
                       focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-150 appearance-none"
              >
                <option disabled value="">
                  {{ $t('auth.selectCountryCode') }}
                </option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.phone_code"
                >
                  +{{ country.phone_code }}
                </option>
              </select>
            </div>
          </VeeField>

          <VeeField :name="phoneName" v-slot="{ field: phoneField, meta: phoneMeta }">
            <div
              class="flex-1"
              :class="{ error: !phoneMeta.valid && phoneMeta.touched }"
            >
              <input
                v-bind="phoneField"
                type="tel"
                :placeholder="placeholder"
                @input="emit('update:phone', $event.target.value)"
                class="w-full border border-placeholder rounded-lg px-3 py-3 bg-transparent text-placeholder text-sm
                       focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-150"
              />
            </div>
          </VeeField>
        </div>

        <div class="flex gap-3 mt-1">
          <VeeErrorMessage :name="codeName" as="div" class="text-red-500 text-xs" />
          <VeeErrorMessage :name="phoneName" as="div" class="text-red-500 text-xs" />
        </div>
      </div>
    </VeeField>
  </div>
</template>

<script setup>
import { Field as VeeField, ErrorMessage as VeeErrorMessage } from "vee-validate";

const props = defineProps({
  codeName: { type: String, required: true },
  phoneName: { type: String, required: true },
  modelValueCode: String,
  modelValuePhone: String,
  placeholder: { type: String, default: "Phone" },
});

const emit = defineEmits(["update:code", "update:phone"]);
const { $api } = useNuxtApp();
const countries = ref([]);

onMounted(async () => {
  try {
    const res = await $api.get("/brand_country");
    countries.value = res.data?.data || [];
  } catch (e) {
    console.error(e);
  }
});
</script>

<style scoped>

select option {
  background-color: #fff;
  color: #374151;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
select option:hover {
  background-color: #f3f4f6;
}
</style>

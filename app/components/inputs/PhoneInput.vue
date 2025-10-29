<template>
  <div class="flex items-center space-x-2">
    <VeeField :name="codeName" v-slot="{ field, meta }">
      <select
        v-bind="field"
        v-model="localCode"
        class="border border-placeholder rounded-lg p-2 bg-transparent focus:outline-none focus:ring focus:ring-placeholder text-sm"
      >
        <option disabled value="">{{ $t('auth.selectCountryCode') }}</option>
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.phone_code"
        >
          {{ country.name }} (+{{ country.phone_code }})
        </option>
      </select>
      <span v-if="meta.touched && meta.error" class="text-red-500 text-xs">
        {{ meta.error }}
      </span>
    </VeeField>

    <VeeField :name="phoneName" v-slot="{ field, meta }">
      <input
        v-bind="field"
        v-model="localPhone"
        type="tel"
        :placeholder="placeholder"
        class="flex-2 border border-placeholder rounded-lg p-2 focus:outline-none focus:ring focus:ring-placeholder text-sm"
      />
      <span v-if="meta.touched && meta.error" class="text-red-500 text-xs">
        {{ meta.error }}
      </span>
    </VeeField>
  </div>
</template>

<script setup>
const props = defineProps({
  codeName: { type: String, required: true },
  phoneName: { type: String, required: true },
  modelValueCode: String,
  modelValuePhone: String,
  placeholder: { type: String, default: 'Phone' },
});

const emit = defineEmits(['update:code', 'update:phone']);
const { $api } = useNuxtApp();

const localCode = ref(props.modelValueCode || '');
const localPhone = ref(props.modelValuePhone || '');
const countries = ref([]);

onMounted(async () => {
  try {
    const res = await $api.get('/brand_country');
    countries.value = res.data?.data || [];
    if (!localCode.value && countries.value.length > 0)
      localCode.value = countries.value[0].phone_code;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
});

watch(localCode, (val) => emit('update:code', val));
watch(localPhone, (val) => emit('update:phone', val));
</script>

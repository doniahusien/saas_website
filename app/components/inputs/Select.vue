<template>
  <VeeField :name="name" v-slot="{ field, meta }">
    <div class="w-full">
      <select
        v-bind="field"
        :id="id"
        :placeholder="placeholder"
        :class="[
          'w-full px-3 py-5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn transition',
          meta.touched && meta.invalid
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        ]"
      >
        <option v-for="(opt, index) in options" :key="opt.id" :value="opt.id" :selected="index === 0">
          {{ opt.name }}
        </option>
      </select>
      <VeeErrorMessage :name="name" class="mt-1 block text-sm text-red-600" />
    </div>
  </VeeField>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
})
</script>

<template>
  <label
    class="w-1/2 h-12 border border-light-gray rounded-md flex justify-between items-center gap-3 px-4 cursor-pointer bg-white"
  >
    <p class="flex items-center gap-2">
      <Icon :name="icon" class="text-placeholder w-5 h-5" />
      <span class="text-sm font-medium">{{ label }}</span>
    </p>

    <input
      type="radio"
      :name="name"
      class="checked:bg-btn checked:border-btn appearance-none w-5 h-5 border-2 border-gray-400 rounded-full"
      :value="value"
      v-model="model"
    />
  </label>
</template>

<script setup>
const props = defineProps({
  label: String,
  icon: String,
  name: String,
  value: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

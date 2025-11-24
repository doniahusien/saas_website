<template>
  <label
    class="w-1/2 h-12 border border-light-gray rounded-md flex justify-between items-center gap-3 px-4 cursor-pointer bg-white"
  >
    <p class="flex items-center gap-2">
<div v-if="icon">
  <Icon :name="icon" class="text-placeholder size-5" />
</div>

<div v-else class="text-red-500 text-xs">
  MISSING ICON
</div>
      <span class="text-sm font-medium">{{ label }}</span>
    </p>

    <div class="flex items-center">
      <input
        type="radio"
        :name="name"
        class="peer sr-only"
        :value="value"
        v-model="model"
      />
      <div class="w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-colors peer-checked:border-btn peer-checked:bg-btn/10 peer-focus:ring-2 peer-focus:ring-btn">
        <span class="w-2 h-2 rounded-full bg-btn transform scale-0 transition-transform peer-checked:scale-100"></span>
      </div>
    </div>
  </label>
</template>

<script setup>
import { computed } from 'vue';

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

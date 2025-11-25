<template>
  <label
  :class="{ 'order-time': orderTime ,'default': !orderTime }"
  >

    <p class="flex items-center gap-2">
      <Icon :name="icon" class="text-placeholder size-5" />
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
      <div class="size-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center transition-colors peer-checked:border-btn peer-checked:bg-btn/10 peer-focus:ring-2 peer-focus:ring-btn">
        <span class="size-2 rounded-full bg-btn transform scale-0 transition-transform peer-checked:scale-100"></span>
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
  orderTime:Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

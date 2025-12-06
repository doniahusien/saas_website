<template>
  <div>
    <VeeField v-model="value" :name="name" v-slot="{ field, meta }">
      <div class="" :class="{ error: !meta.valid && meta.touched }">
        <label
          v-if="label"
          :for="name"
          class="label flex gap-2 capitalize items-center"
          :class="{ label_active: value }"
        >
          {{ label ? $t(`LABELS.${label}`) : $t(`LABELS.${name}`) }}
        </label>

        <div class="relative">
          <input
            v-bind="field"
            :id="name"
            autocomplete="off"
            class="input"
            :placeholder="placeholder || $t('LABELS.password')"
            :type="showPassword ? 'text' : 'password'"
            :style="!meta.valid && meta.touched ? { borderColor: '#ef4444' } : {}"
          />

          <button
            type="button"
            class="absolute top-1/2 right-3 -translate-y-1/2"
            @click="togglePassword"
          >
            <Icon :name="showPassword ? 'eye-slash' : 'eye'" />
          </button>

          <button
            v-if="showCopy"
            type="button"
            class="far fa-copy absolute top-1/2 right-12 -translate-y-1/2 text-sub"
            @click="copyPassword(field.value)"
          ></button>
        </div>

        <VeeErrorMessage
          v-if="!meta.valid && meta.touched"
          :name="name"
          as="div"
          class="text-red-500 text-sm mt-1"
        />
      </div>
    </VeeField>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  name: { type: String, required: true },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  showCopy: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);
const showPassword = ref(false);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function copyPassword(password) {
  try {
    await navigator.clipboard.writeText(password);
    console.log("Password copied!");
  } catch (error) {
    console.error("Failed to copy password:", error);
  }
}
</script>

<style scoped>

</style>

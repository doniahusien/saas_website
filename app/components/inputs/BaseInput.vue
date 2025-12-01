<template>
  <VeeField :name="name" v-slot="{ field, meta }">
    <div
      :class="[
        { error: !meta.valid && meta.touched, prepend: prepend },
        classes
      ]"
    >
      <label
        :for="id"
        v-if="label"
        :class="labelClass"
        class="label flex! gap-2 capitalize items-center"
      >
        {{ label }}
        <span v-if="optional" class="text-sub">
          ({{ $t("LABELS.optional") }})
        </span>
      </label>

      <div class="relative">
        <textarea
          v-if="type == 'textarea'"
          :id="id"
          v-bind="field"
          :placeholder="placeholder"
          @input="$emit('update:value', $event.target.value)"
          class="resize-none input h-40!"
          :rows="rows"
        ></textarea>

        <input
          class="input"
          :disabled="disabled"
          :step="step"
          v-else
          :type="type"
          :id="id"
          v-bind="field"
          :placeholder="placeholder"
          :minlength="minlength"
          :maxlength="maxlength"
          :size="size"
          :pattern="pattern"
          @input="$emit('update:value', $event.target.value)"
          @change="$emit('change')"
          :autocomplete="autocomplete"
          :readonly="lockInput"
          @focus="lockInput = false; $emit('focus')"
        />
        <div v-if="prepend" class="prepend">
          <slot name="prepend"></slot>
        </div>
      </div>

      <VeeErrorMessage
        v-if="!meta.valid && meta.touched"
        :name="name"
        as="div"
        class="text-red-500"
      />
    </div>
  </VeeField>
</template>

<script setup>

const lockInput = ref(true);

const props = defineProps({
  id: {
    required: true,
  },
  disabled: Boolean,
  name: {
    required: true,
  },
  classes: String,
  rows: Number,
  label: String,
  step: Number,
  prepend: Boolean,
  minlength: Number,
  maxlength: Number,
  size: Number,
  pattern: String,
  placeholder: String,
  value: [String, Number],
  labelClass: String,
  type: {
    type: String,
    default: "text",
  },
  optional: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
});

const inputFiled = useField(props.name);

watch(
  () => props.value,
  (value) => {
    if (value || value == 0) {
      inputFiled.setValue(value);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.input_wrapper.error textarea {
  border-color: #ef4444;
}
</style>

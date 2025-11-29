<template>
  <UAccordion
    v-if="safeFaq.length"
    :items="formattedFaq"
    multiple
    class="bg-red-500"
    :ui="{
      label: `text-lg font-semibold text-black`,
      content: `text-base text-start text-black`,
      trigger: 'flex justify-between',
    }"
  >

    <template #default="{ item, index }">
      <div class="flex items-center gap-8">
        <span>{{ item.label }}</span>
      </div>
    </template>

    <template #trailing="{ open }">
      <span class="text-2xl font-bold text-black">
        {{ open ? '>' : '<' }}
      </span>
    </template>
  </UAccordion>

  <div v-else class=" py-10 text-gray-500">
    No FAQs available.
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  faq: {
    type: Array,
    required: false, 
    default: () => []
  },
  labelStyle: {
    type: String,
    default: "text-white"
  },
  contentStyle: {
    type: String,
    default: "text-light-gray"
  }
});

const safeFaq = computed(() => Array.isArray(props.faq) ? props.faq : []);

const formattedFaq = computed(() =>
  safeFaq.value.map(item => ({
    label: item.question,
    content: item.answer
  }))
);
</script>

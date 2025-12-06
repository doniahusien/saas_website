<template>
  <div class="faqs container mx-auto py-12" v-if="items?.length">
    <div
      class="my-5 rounded-xl bg-website-white p-5 px-6"
      v-for="item in items"
      :key="item.id"
    >
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class=" flex w-full items-center justify-between py-4 text-left text-lg font-medium text-text focus:outline-none"
        >
          {{ item.question }}
          <div class="strokeColor">
            <NuxtIcon
              :name="open ? 'mdi:angle-up' : 'mdi:angle-down'"
              class="ms-auto flex size-13 items-center justify-center rounded-full border text-sm text-primary"
              :class="
                open
                  ? 'border-secondary bg-secondary'
                  : 'border-secondary bg-transparent'
              "
            />
          </div>
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel class="pb-4 text-third">
            {{ item.answer }}
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </div>
  </div>
  <div v-else class="flex min-h-[60vh] items-center justify-center">
    {{ $t("LABELS.no data in faq") }}
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const props = defineProps({
  items: {
    required: true,
  },
});
</script>

<style lang="scss">
.faqs {
  svg {
    @apply h-5 w-5;
  }
  [data-icon="angle-down"] {
    path {
      @apply text-third;
    }
  }
}
</style>

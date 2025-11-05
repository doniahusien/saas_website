<template>
  <section class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div class="flex justify-center">
        <div class="w-full md:w-4/5 lg:w-3/4 aspect-4/5">
          <NuxtImg
            :src="subscriptionContent.image"
            alt="subscription image"
            class="object-cover w-full h-full rounded-full shadow-md"
          />
        </div>
      </div>
      <div class="space-y-8 mt-10 md:mt-0">
        <div
          v-html="subscriptionContent.title"
          class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        ></div>

        <div
          v-html="subscriptionContent.desc"
          class="text-base md:text-lg text-subtitle"
        ></div>

        <VeeForm
          @submit="handleSubmit"
          :validation-schema="schema"
          class="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div class="col-span-2">
            <VeeField
              name="email"
              type="email"
              :placeholder="$t('subscription.placeholder')"
              class="w-full px-5 py-3 rounded-full border border-secondary bg-white/80 text-subtitle focus:ring-2 focus:ring-btn focus:outline-none"
            />
            <VeeErrorMessage
              name="email"
              class="text-red-500 text-xs mt-1 block text-start"
            />
          </div>

          <button
            type="submit"
            class="w-full  rounded-full px-8 py-3 font-medium text-white bg-btn hover:opacity-90 transition"
          >
            {{ $t('subscription.cta') }}
          </button>
        </VeeForm>
      </div>
    </div>
  </section>
</template>

<script setup>
import { object, string } from "yup";
const { t } = useI18n();

defineProps({
  subscriptionContent: Object,
});

const schema = object({
  email: string().required("Email is required").email("Enter a valid email"),
});

const handleSubmit = (values) => {
  console.log("Details:", values);
};
</script>

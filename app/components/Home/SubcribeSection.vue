<template>
  <div class="container mx-auto space-y-10">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
      <div class="w-[260px] h-[400px] md:w-[360px] md:h-[500px] lg:w-[560px] lg:h-[700px] mx-auto">
        <NuxtImg
          :src="subscriptionContent.image"
          alt="bg-story"
          class="object-cover w-full h-full rounded-full"
        />
      </div>

      <div class="space-y-9 mt-8 md:mt-0 px-8 md:px-15">
        <div
          v-html="subscriptionContent.title"
          class="text-2xl md:text-3xl lg:text-5xl font-bold"
        ></div>
        <div v-html="subscriptionContent.desc" class="text-subtitle"></div>

        <VeeForm
          @submit="handleSubmit"
          :validation-schema="schema"
          class="flex items-center justify-between"
        >
          <div>
            <VeeField
              name="email"
              type="email"
              class="w-full p-2 rounded-full focus:outline-none text-secondary bg-transparent"
              :placeholder="$t('subscription.placeholder')"
            />
            <VeeErrorMessage name="email" class="text-red-500 text-xs mt-1" />
          </div>
          <button
            type="submit"
            class="rounded-full text-sm md:text-base font-medium cursor-pointer px-6 py-3 text-white bg-btn"
          >
            {{ $t("subscription.cta") }}
          </button>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { object, string } from "yup";
const { t } = useI18n();

defineProps({
  subscriptionContent: Object,
});

const schema = object({
  email: string().required("Email is required"),
});
const handleSubmit = (values) => {
  console.log("Details:", values);
};
</script>

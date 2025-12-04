<template>
  <section class="container mx-auto px-6 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      <div class="w-140 me-auto">
        <NuxtImg
          :src="subscriptionContent.image"
          alt="subscription image"
          class="object-cover w-full h-full shadow-md"
        />
      </div>
      <div class="space-y-8 mt-10 md:mt-0">
        <!--   <div
          v-html="subscriptionContent.title"
          class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        ></div> -->

        <h3 class="max-w-100 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Subcribe To Our Newsletter</h3>
        <div
          v-html="subscriptionContent.desc"
          class="text-base md:text-lg text-text-ligh"
        ></div>

        <VeeForm
          @submit="handleSubmit"
          :validation-schema="schema"
          class="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-full bg-website-white"
        >
          <div class="col-span-2">
            <VeeField
              name="email"
              type="email"
              :placeholder="$t('subscription.placeholder')"
              class="rounded-full border border-line bg-website-white text-text focus:outline-none px-3 py-6 w-full"
            />
            <VeeErrorMessage
              name="email"
              class="text-red-500 text-xs mt-1 block text-start"
            />
          </div>

          <button
            type="submit"
            class="w-40 cursor-pointer rounded-full p-4 font-medium text-website-white bg-primary hover:opacity-90 transition ms-auto"
          >
            {{ $t("subscription.cta") }}
          </button>
        </VeeForm>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { object, string } from "yup";
import { useToast } from "vue-toastification";
const { t } = useI18n();
const { $api } = useNuxtApp();
const toast = useToast();
defineProps({
  subscriptionContent: Object,
});

const schema = object({
  email: string().email(`${t("errors.emailRequired")}`),
});

async function handleSubmit(values) {
  try {
    const { data } = await $api.post("/news-letter-subscription", {
      email: values.email,
    });
    toast.success(data.message);
  } catch (err) {
    toast.error(err?.message);
    /* toast.error(error?.response?.data?.message || "Something went wrong."); */
  }
}
</script>

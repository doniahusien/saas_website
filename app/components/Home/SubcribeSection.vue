<template>
  <section class="container mx-auto px-6 md:px-0 bg-[url('/images/bg/bg4.png')] bg-bottom-left bg-no-repeat">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
      <div class="w-full md:w-140 me-auto">
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

        <h3 class="max-w-100 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{{$t('subscription.title')}}</h3>
        <div
          v-html="subscriptionContent.desc"
          class="text-base  text-text-ligh"
        ></div>

<VeeForm
  @submit="handleSubmit"
  :validation-schema="schema"
  v-slot="{ meta }"
  class="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-full bg-website-white"
>
  <div class="col-span-2">
    <VeeField
      name="email"
      type="email"
      :placeholder="$t('subscription.placeholder')"
      class="rounded-full border border-line bg-website-white text-text focus:outline-none px-3 py-4 placeholder:text-sub placeholder:text-lg w-full"
    />
  </div>

  <button
    type="submit"
    :disabled="!meta.valid"
    class="w-fit rounded-full px-6 font-medium text-website-white bg-primary transition ms-auto"
    :class="{
      'opacity-40 cursor-not-allowed': !meta.valid,
      'hover:opacity-90 cursor-pointer': meta.valid
    }"
  >
    {{ $t("subscription.cta") }}
  </button>
    <VeeErrorMessage
      name="email"
      class="text-red-500 text-base mt-2 block text-start"
    />
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
  email: string()
    .email(t("errors.emailInvalid")),
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

<template>
  <div class="container flex flex-col gap-5 flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />

    <h2 class="font-bold mb-4 text-3xl md:text-5xl">
      {{ t("auth.forgotPasswordTitle") }}
    </h2>

    <p class="text-secondary text-base md:text-lg">
      {{ t("auth.forgotPasswordInstruction") }}
    </p>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <inputsPhoneInput />

      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{ t("auth.send") }}
      </button>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
})

const { t } = useI18n()
const loading = ref(false)
</script>

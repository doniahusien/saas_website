<template>
  <div class="container flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />

    <h2 class="font-bold mb-4 text-3xl md:text-5xl">
      {{ t("auth.verifyCode") }}
    </h2>

    <p class="text-secondary text-base md:text-lg">
      {{ t("auth.verifyInstruction") }}
    </p>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <NuxtLink to="/auth/login" class="text-btn underline">
        {{ t("auth.editPhoneNumber") }}
      </NuxtLink>

      <div class="flex flex-col space-y-5 py-5">
        <UPinInput
          size="xl"
          :length="4"
          :ui="{
            base: 'border border-placeholder bg-transparent flex justify-between w-full h-28',
            input: 'text-center text-3xl rounded-md h-full'
          }"
        />
      </div>

      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{ t("auth.next") }}
      </button>

      <p class="pt-5">
        {{ t("auth.didNotReceive") }}
        <NuxtLink to="/auth/signup" class="text-btn underline">
          {{ t("auth.resend") }}
        </NuxtLink>
      </p>
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

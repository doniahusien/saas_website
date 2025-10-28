<template>
  <div class="container gap-3 flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />

    <h2 class="font-bold mb-4 text-3xl md:text-5xl">
      {{ t("auth.changePasswordTitle") }}
    </h2>

    <p class="text-secondary text-base md:text-lg">
      {{ t("auth.changePasswordInstruction") }}
    </p>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-4 pt-2">
        <inputsBasePassword
          id="password"
          name="password"
          :placeholder="t('auth.newPassword')"
        />
        <inputsBasePassword
          id="newpassword"
          name="newpassword"
          :placeholder="t('auth.confirmNewPassword')"
        />
      </div>

      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{ t("auth.confirm") }}
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

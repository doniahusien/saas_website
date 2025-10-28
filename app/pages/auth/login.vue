<template>
  <div class="container flex flex-col flex-1 justify-center">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />
    <h2 class="font-bold mb-4 text-3xl md:text-5xl">{{ t("auth.welcomeBack") }}</h2>
    <p class="text-secondary text-base md:text-lg">
      {{ t("auth.enterCredentials") }}
    </p>

    <VeeForm class="w-full" @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-6 py-10">
        <inputsPhoneInput
          id="phone"
          v-model="form.phone"
        />
        <inputsBasePassword
          id="password"
          name="password"
          v-model="form.password"
          :placeholder="t('auth.password')"
        />
      </div>

      <div class="flex justify-between">
        <UCheckbox
          :label="t('auth.rememberMe')"
          :ui="{ label: 'text-secondary' }"
        />
        <NuxtLink to="/auth/forgot-pass" class="underline text-sm md:text-base">
          {{ t("auth.forgotPassword") }}
        </NuxtLink>
      </div>

      <button
        
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4"
      >
        {{ t("auth.login") }}
      </button>

      <p class="text-center pt-5">
        {{ t("auth.dontHaveAccount") }}
        <NuxtLink to="/auth/signup" class="text-btn">
          {{ t("auth.signUpNow") }}
        </NuxtLink>
      </p>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { configure } from 'vee-validate'
import * as yup from 'yup'
import {useAppAuth} from '~/store/auth'
definePageMeta({ layout: 'auth' })
const { t } = useI18n()
const appAuth = useAppAuth()
const loading = ref(false)

const form = reactive({
  phone: '',
  password: ''
})

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
})

const schema = yup.object({
  phone: yup.string().required(t('ERRORS.isRequired', { name: t('LABELS.phone') })),
  password: yup.string().required(t('ERRORS.password')),
})

async function handleSubmit() {
  try {
    loading.value = true
    await appAuth.login({
      phone_code: '20', 
      phone: form.phone,
      password: form.password,
      device_type: 'web',
      device_token: '123456',
    })
    console.log("done");
    
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

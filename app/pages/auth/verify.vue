<template>
  <div class="container flex flex-col flex-1 justify-center items-start ">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain mb-6" />

    <h2 class="font-bold mb-3 text-3xl md:text-5xl">
      {{ t("auth.verifyCode") }}
    </h2>
    <p class="text-secondary text-base md:text-lg mb-6">
      {{ t("auth.verifyInstruction") }}
    </p>

    <VeeForm
      :validation-schema="schema"
      @submit="handleSubmit"
      v-slot="{ errors }"
      class="w-full"
    >
      <VeeField name="verification_code" v-model="form.verification_code" type="hidden" />
      <button
        type="button"
        class="text-btn underline"
        @click="showEditPhone = true"
      >
        {{ t("auth.editPhoneNumber") }}
      </button>

      <div class="flex flex-col space-y-5 py-5">
        <UPinInput
          v-model="code"
          :length="4"
          size="xl"
          :ui="{
            base: 'text-black border border-placeholder bg-transparent flex justify-between w-full h-28',
            input: 'text-center text-3xl rounded-md h-full'
          }"
        />

        <p v-if="errors.verification_code" class="text-red-500 text-sm">
          {{ errors.verification_code }}
        </p>
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="bg-btn text-white text-base md:text-lg w-full mt-4 rounded-full p-4 disabled:opacity-50"
      >
        <span v-if="!loading">{{ t("auth.next") }}</span>
        <span v-else>...</span>
      </button>

      <p class="pt-5 text-center">
        {{ t("auth.didNotReceive") }}
        <NuxtLink to="/auth/signup" class="text-btn underline">
          {{ t("auth.resend") }}
        </NuxtLink>
      </p>
    </VeeForm>
    <EditPhoneModal v-model="showEditPhone" />
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup"
import { useAppAuth } from "~/store/auth"
import { useToast } from "vue-toastification"

definePageMeta({ layout: "auth" })

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const appAuth = useAppAuth()
const toast = useToast()
const loading = ref(false)
const showEditPhone = ref(false)

const form = reactive({
  phone_code: "",
  phone: "",
  verification_code: "",
})

const code = computed({
  get: () => form.verification_code.split(""),
  set: (val) => {
    form.verification_code = Array.isArray(val) ? val.join("") : val
  },
})

onMounted(() => {
  if (appAuth.tempVerifyData) {
    form.phone_code = appAuth.tempVerifyData.phone_code
    form.phone = appAuth.tempVerifyData.phone
  } else {
    form.phone_code = (route.query.phone_code as string) || ""
    form.phone = (route.query.phone as string) || ""
  }
})
watch(
  () => appAuth.tempVerifyData,
  (newVal) => {
    if (newVal) {
      form.phone_code = newVal.phone_code
      form.phone = newVal.phone
    }
  },
  { immediate: true, deep: true }
)
const schema = yup.object({
  verification_code: yup
    .string()
    .required(t("auth.verificationRequired"))
    .length(4, t("auth.verificationLength")),
})

async function handleSubmit(values: any) {
  try {
    loading.value = true

    if (!form.phone_code || !form.phone) {
      toast.error("Missing phone data. Please go back and try again.")
      return
    }

    await appAuth.verifyPhone({
      phone_code: form.phone_code,
      phone: form.phone,
      verification_code: values.verification_code,
      device_type: "web",
    })
  } catch (err: any) {
    console.error("Verify Error:", err)
  } finally {
    loading.value = false
  }
}
</script>

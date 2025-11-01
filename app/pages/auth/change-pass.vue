<template>
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain" />

    <h2 class="font-bold mb-4 text-3xl md:text-5xl">
      {{ t("auth.changePasswordTitle") }}
    </h2>

    <p class="text-secondary text-base md:text-lg">
      {{ t("auth.changePasswordInstruction") }}
    </p>

    <VeeForm @submit="handleSubmit" :validation-schema="schema">
      <div class="space-y-4 pt-2">
        <inputsBasePassword
          id="password"
          name="password"
          v-model="form.password"
          :placeholder="t('auth.newPassword')"
        />
        <inputsBasePassword
          id="password_confirmation"
          name="password_confirmation"
          v-model="form.password_confirmation"
          :placeholder="t('auth.confirmNewPassword')"
        />
      </div>

      <button
        :disabled="loading"
        type="submit"
        class="bg-btn text-white text-base md:text-lg w-full mt-8 rounded-full p-4 disabled:opacity-50"
      >
        <span v-if="!loading">{{ t("auth.confirm") }}</span>
        <span v-else>...</span>
      </button>
    </VeeForm>
</template>

<script setup lang="ts">
import * as yup from "yup"
import { useToast } from "vue-toastification"

definePageMeta({
  layout: "auth",
})

const { t } = useI18n()
const { $api } = useNuxtApp()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const loading = ref(false)

const form = reactive({
  phone_code: "",
  phone: "",
  reset_code: "",
  password: "",
  password_confirmation: "",
})

const schema = yup.object({
  password: yup.string().required(t("auth.passwordRequired")).min(6),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("auth.passwordMatch"))
    .required(t("auth.passwordConfirmRequired")),
})

onMounted(() => {
  form.phone_code = (route.query.phone_code as string) || ""
  form.phone = (route.query.phone as string) || ""
  form.reset_code = (route.query.reset_code as string) || ""

  if (!form.phone || !form.phone_code) {
    toast.error("Missing phone info. Please restart password reset.")
  }
})

async function handleSubmit(values: any) {
  try {
    loading.value = true

    if (!form.phone_code || !form.phone || !form.reset_code) {
      toast.error("Missing verification data. Please go back to verify again.")
      return
    }

    const payload = {
      phone_code: form.phone_code,
      phone: form.phone,
      reset_code: form.reset_code,
      password: values.password,
      password_confirmation: values.password_confirmation,
    }

    const { data } = await $api.post("/auth/reset_password", payload)

    if (data?.status === "success") {
      toast.success(data?.message || "Password changed successfully!")
      router.push("/auth/login")
    } else {
      toast.error(data?.message || "Failed to change password.")
    }
  } catch (err: any) {
    console.error("Reset Password Error:", err)
    toast.error(err?.response?.data?.message || "Something went wrong.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-lg p-6 relative animate-fadeIn"
      >
        <button
          @click="emit('update:modelValue', false)"
          class="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold mb-2">Edit Phone Number</h2>
        <p class="text-gray-500 text-sm mb-5">
          Please enter your phone number so we can verify it
        </p>

        <VeeForm :validation-schema="schema" @submit="handleSubmit">
          <inputsPhoneInput
            codeName="phone_code"
            phoneName="phone"
            v-model:code="form.phone_code"
            v-model:phone="form.phone"
          />

          <button
            type="submit"
            class="bg-indigo-500 text-white w-full rounded-full mt-6 py-3 text-lg font-medium hover:bg-indigo-600 transition-all"
          >
            Verify
          </button>
        </VeeForm>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useAppAuth } from "~/store/auth"
import { useToast } from "vue-toastification"
import * as yup from "yup"

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})
const emit = defineEmits(["update:modelValue"])

const appAuth = useAppAuth()
const toast = useToast()
const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive({
  phone_code: "",
  phone: "",
})

const schema = yup.object({
  phone_code: yup.string().required("Please select a country code"),
  phone: yup.string().required("Please enter your phone number"),
})

const loading = ref(false)

async function handleSubmit() {
  try {
    if (!form.phone_code || !form.phone) return
    loading.value = true

    const { data } = await $api.post("/auth/resend_verification_code", {
      phone_code: form.phone_code,
      phone: form.phone,
    })

    if (data?.status === "success" || data?.success === true) {
      appAuth.tempVerifyData = {
        phone_code: form.phone_code,
        phone: form.phone,
      }

      toast.success(data?.message || "Verification code sent successfully!")
      emit("update:modelValue", false)
      router.push("/auth/verify")
    } else {
      toast.error(data?.message || "Failed to resend verification code.")
    }
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || "Something went wrong.")
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

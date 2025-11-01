<template>
  <div class="container px-5 md:px-20 lg:px-25 mx-auto">
    <NuxtImg src="/logo.png" alt="logo" class="w-24 h-24 object-contain mb-6" />

    <h2 class="font-bold mb-3 text-3xl md:text-5xl">
      {{ t("auth.verifyCode") }}
    </h2>
    <p class="text-secondary text-base md:text-lg mb-6">
      {{ t("auth.verifyInstruction") }}
    </p>

    <VeeForm :validation-schema="schema" @submit="handleSubmit" v-slot="{ errors }">
      <VeeField name="verification_code" v-model="form.verification_code" type="hidden" />
      <button
        type="button"
        class="text-btn underline cursor-pointer"
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
            base:
              'text-btn border border-placeholder bg-transparent md:m-1 w-full h-16 md:h-28',
            input:
              'text-center text-6xl rounded-lg h-full w-full bg-transparent focus:outline-none',
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
        <button
          type="button"
          class="text-btn underline cursor-pointer"
          @click="handleResend"
          :disabled="resendLoading || cooldown > 0"
        >
          <span v-if="resendLoading">...</span>
          <span v-else-if="cooldown > 0">Resend in {{ cooldown }}s</span>
          <span v-else>{{ t("auth.resend") }}</span>
        </button>
      </p>
    </VeeForm>
    <EditPhoneModal v-model="showEditPhone" />
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useAppAuth } from "~/store/auth";
import { useToast } from "vue-toastification";

definePageMeta({ layout: "auth" });

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { $api } = useNuxtApp();
const appAuth = useAppAuth();
const toast = useToast();

const loading = ref(false);
const resendLoading = ref(false);
const cooldown = ref(0);
const showEditPhone = ref(false);

const form = reactive({
  phone_code: "",
  phone: "",
  verification_code: "",
});

const code = computed({
  get: () => form.verification_code.split(""),
  set: (val) => {
    form.verification_code = Array.isArray(val) ? val.join("") : val;
  },
});

onMounted(() => {
  if (appAuth.tempVerifyData) {
    form.phone_code = appAuth.tempVerifyData.phone_code;
    form.phone = appAuth.tempVerifyData.phone;
  }
});

watch(
  () => appAuth.tempVerifyData,
  (newVal) => {
    if (newVal) {
    /*   console.log('Updated TempVerifyData from Pinia:', newVal); */
      form.phone_code = newVal.phone_code;
      form.phone = newVal.phone;
    }
  },
  { immediate: true, deep: true }
);

const schema = yup.object({
  verification_code: yup
    .string()
    .required(t("auth.verificationRequired"))
    .length(4, t("auth.verificationLength")),
});

async function handleSubmit(values: any) {
  try {
    loading.value = true;

    const fromForgot = route.query?.from === "forgot";

    if (fromForgot) {
      const payload = {
        phone_code: form.phone_code,
        phone: form.phone,
        reset_code: values.verification_code,
      };

      const { data } = await $api.post("/auth/verify_forgot_password_code", payload);

      const isSuccess =
        data?.status === true || data?.status === "success" || data?.success === true;

      if (isSuccess) {
        toast.success(data?.message || "Code verified successfully!");
        appAuth.setTempVerifyData(payload);
        router.push({
          path: "/auth/change-pass",
        });
      } else {
        toast.error(data?.message || "Invalid code.");
      }
    } else {
      await verifyPhone({
        phone_code: form.phone_code,
        phone: form.phone,
        verification_code: values.verification_code,
        device_type: "web",
      });
    }
  } catch (err: any) {
    console.error("Verify Error:", err);
    toast.error(err?.response?.data?.message || "Verification failed.");
  } finally {
    loading.value = false;
  }
}

async function verifyPhone(payload) {
  try {
    const { data } = await $api.post("/auth/verify_phone", {
      phone_code: payload.phone_code,
      phone: payload.phone,
      verification_code: payload.verification_code,
      device_type: "web",
    });

    if (data.status === "success") {
      appAuth.setAuthData(data.data);
      toast.success(data.message || "Account verified successfully");
      router.push({ path: "/" });
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Verification failed");
  }
}

async function handleResend() {
  const phoneData = appAuth.tempVerifyData;
  try {
    resendLoading.value = true;
    const payload = {
      phone_code: phoneData.phone_code,
      phone: phoneData.phone,
    };

    const { data } = await $api.post("/auth/resend_verification_code", payload);
    toast.success(data?.message || "Verification code resent successfully!");
    startCooldown(30);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Failed to resend code.");
  } finally {
    resendLoading.value = false;
  }
}

function startCooldown(seconds: number) {
  cooldown.value = seconds;
  const interval = setInterval(() => {
    if (cooldown.value > 0) {
      cooldown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}
</script>

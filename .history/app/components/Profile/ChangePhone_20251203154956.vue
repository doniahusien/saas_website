<template>
  <div class="text-end bg-white">
    <div class="mb-3 flex flex-wrap justify-end gap-2 text-lg font-semibold">
      <button type="button" class="text-primary" @click="openPhone = true">
        {{ t("TITLES.change phone") }}
      </button>
    </div>
    <teleport to="body">
      <div class="relative">
        <general-modal
          classes=" !w-full md:!max-w-150 bg-white"
          :persist="true"
          v-if="openPhone"
          :title="t('TITLES.change phone')"
          @close="resetData"
        >
          <VeeForm as="div" @submit="handleSubmit" :validation-schema="schema">
            {{ $t("LABELS.Entry new phone number") }}
            <form class="w-100 mt-7" aria-autocomplete="none">
              <inputsPhoneInput
                codeName="phone_code"
                phoneName="phone"
                v-model:code="formValues.phone_code"
                v-model:phone="formValues.phone"
                :placeholder="$t('LABELS.enterYour', { name: $t('LABELS.phone') })"
              />

              <button
                :disabled="loading"
                type="submit"
                class="base-btn ms-auto mt-7 w-fit py-3 2xl:mt-11"
              >
                {{ $t("BUTTONS.confirm") }}
              </button>
            </form>
          </VeeForm>
        </general-modal>
      </div>
    </teleport>
    <teleport to="body">
      <div class="relative">
        <general-modal
          :persist="true"
          v-if="openVerify"
          :title="t('TITLES.verifyCode')"
          @close="resetData"
        >
          <p class="mb-5 mt-3 max-w-[450px] text-text-light">
            {{ $t("TITLES.verificationMessage") }}
          </p>

          <button
            type="button"
            @click="
              openVerify = false;
              openPhone = true;
            "
            class="mb-4 flex items-center font-medium capitalize text-primary underline"
          >
            {{ $t("TITLES.editTheNumber") }}
          </button>

          <VeeForm @submit="onSubmit">
            <div
              class="input_wrapper otp_inputs mx-auto justify-between"
              :class="!validation.valid && validation.touched ? 'error' : ''"
            >
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator=" "
                v-model="verify_code"
                :value="verify_code"
                :num-inputs="4"
                :should-auto-focus="true"
                input-type="letter-numeric"
                @on-change="handleOnChange"
                @on-complete="handleOnComplete"
              />
              <p class="mb-0 mt-2 text-sm text-error" v-if="errorMessage">
                {{ errorMessage }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSubmitLoading"
              class="base-btn mt-7 w-full py-5"
            >
              {{ $t("BUTTONS.confirm") }}
            </button>

            <div class="mt-5 flex items-center justify-between">
              <div class="flex items-center">
                <p class="mb-0 me-1">
                  {{ $t("TITLES.ifYouDontReceiveCode") }}
                </p>
                <button
                  :disabled="seconds != 0 || minutes != 0"
                  class="font-medium text-primary disabled:cursor-default disabled:!text-third"
                  type="button"
                  @click="resendCode"
                >
                  {{ $t("BUTTONS.resend") }}
                </button>
              </div>
              <span class="font-medium text-primary">
                <bdi>00:{{ seconds < 10 ? "0" : "" }}{{ seconds }}</bdi>
              </span>
            </div>
          </VeeForm>

          <general-modal-success
            :persist="true"
            v-if="openSuccessModal"
            :title="t('TITLES.change phone')"
            :message="t('TITLES.The phone has been successfully changed')"
            @close="openSuccessModal = false"
          />
        </general-modal>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import { useToast } from "vue-toastification";
import VOtpInput from "vue3-otp-input";
import { useAppStore } from "~/store/app";
const appStore = useAppStore();

const openVerify = ref(false);
const openPhone = ref(false);
const seconds = ref(30);
const minutes = ref(0);
const loading = ref(false);
const openSuccessModal = ref(false);
const toast = useToast();
const {$api} = useNuxtApp();
const localePath = useLocalePath();

const i18n = useI18n();
const verify_code = ref("");
const errorMessage = ref("");

const validation = reactive({
  valid: false,
  touched: false,
});

const formValues = reactive({
  phone: "",
  phone_code: "",
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const { t } = useI18n();

const schema = yup.object().shape({
  phone: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.phone") })),
  phone_code: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.phoneCode") })),
});

const dataToVerify = ref(null);
const emit = defineEmits(["reload"]);
function handleSubmit(values) {
  loading.value = true;

  axios
    .post("profile/send_verification_code", values)
    .then((res) => {
      setTimeout(() => toast.success(res.data.message), 300);
      dataToVerify.value = values;
      countDown();
      openPhone.value = false;
      openVerify.value = true;
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;

      toast.error(e.response.data.message);
    });
}

function handleOnComplete(event) {
  validation.touched = false;
  validation.valid = true;
  verify_code.value = event;
}

function handleOnChange(e) {
  validation.touched = true;
  validation.valid = false;

  if (e.length == 4) {
    errorMessage.value = "";
  } else {
    errorMessage.value = i18n.t("ERRORS.verificationCode");
  }
}

function countDown() {
  seconds.value = 30;
  let secondsInterval = setInterval(() => {
    if (seconds.value <= 0) {
      clearTimeout(secondsInterval);
      if (minutes.value == 0) return;
    }
    seconds.value--;
  }, 1000);
}

const isSubmitLoading = ref(false);
function onSubmit() {
  if (!verify_code.value || verify_code.value.length != 4) {
    errorMessage.value = i18n.t("ERRORS.verificationCode");
    return;
  }

  isSubmitLoading.value = true;
  const frmData = new FormData();
  frmData.append("phone_code", dataToVerify.value.phone_code);
  frmData.append("phone", dataToVerify.value.phone);
  frmData.append("verification_code", verify_code.value);

  axios
    .post("profile/update_phone", frmData)
    .then(() => {
      validation.touched = false;
      validation.valid = false;

      verify_code.value = "";
      isSubmitLoading.value = false;

      openSuccessModal.value = true;
      setTimeout(() => {
        resetData();
        emit("reload");
      }, 2500);
    })
    .catch((e) => {
      verify_code.value = "";
      isSubmitLoading.value = false;

      toast.error(e.response.data.message);
    });
  validation.touched = false;
  validation.valid = true;
}
function resendCode() {
  axios
    .post("profile/send_verification_code", dataToVerify.value)
    .then((res) => {
      setTimeout(() => toast.success(res.data.message), 300);

      countDown();
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}

function resetData() {
  openPhone.value = false;
  openSuccessModal.value = false;
  openVerify.value = false;
  dataToVerify.value = null;
}
</script>

<style></style>

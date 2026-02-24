<template>
  <loader v-if="reasonsLoading" />
  <VeeForm
    v-else
    :validation-schema="schema"
    @submit="handleSubmit"
    :initial-values="initialValues"
    v-slot="{ meta, values }"
    class="bg-white w-full"
  >
    <div v-if="items.length > 0">
      <div class="cancel-reason-checkout ">
        <div class="space-y-5" v-for="item in items" :key="item.id">
          <div class="mt-5 grid grid-cols-1 gap-5 font-semibold">
            <VeeField
              name="reason"
              type="radio"
              v-slot="{ field, meta }"
              :value="item.id"
            >
              <div
                class="w-full"
                :class="{
                  error: !meta.valid && meta.touched,
                }"
              >
                <div
                  class="flex flex-wrap items-center rounded-xl bg-white"
                >
                  <label
                    :for="item.id + item.desc"
                    class=" flex w-full items-center justify-between"
                  >
                    <h5 class="mb-1 text-lg font-semibold">{{ item.desc }}</h5>
                    <input
                      name="reason"
                      :id="item.id + item.desc"
                      v-bind="field"
                      type="radio"
                      :value="item.id"
                      class="ms-auto size-5"
                    />
                  </label>
                </div>
              </div>
            </VeeField>
          </div>
        </div>
        <div class="mt-5">
          <VeeField name="reason" type="radio" :value="'other'" v-slot="{ field, meta }">
            <div class="flex flex-wrap items-center rounded-xl bg-white">
              <label for="other" class="flex w-full items-center justify-between">
                <h5 class="mb-1 text-lg font-semibold">{{ $t("LABELS.other") }}</h5>
                <input id="other" v-bind="field" type="radio" value="other" class="ms-auto size-5" />
              </label>
            </div>
          </VeeField>

          <div v-if="values.reason === 'other'" class="mt-6">
            <label class="block text-base font-semibold mb-2">Type your reason here</label>
            <VeeField
              name="other"
              as="textarea"
              placeholder="Type your reason here"
              maxlength="100"
              class="w-full p-4 border rounded-xl focus:outline-none resize-none"
              rows="4"
            />
          </div>
        </div>

        <VeeErrorMessage name="reason" as="div" class="text-error" />
      </div>
      <button
        type="submit"
        class="mt-auto h-14 w-full rounded-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ $t("BUTTONS.Confirm") }}
      </button>
    </div>
    <div v-else class="flex min-h-75 items-center justify-center">
      {{ $t("LABELS.no reasons") }}
    </div>
  </VeeForm>
</template>

<script setup>
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { useToastStore } from "~/store/toast.js";
const toast = useToastStore();
const {$api} = useNuxtApp();
const i18n = useI18n();
const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  isReservation: {
    required: false,
    default: false,
  },
  reservationId: {
    required: false,
  },
});
const emit = defineEmits(["reload"]);
const items = ref([]);
const reasonsLoading = ref(true);

const initialValues = reactive({
  reason: "",
  is_other: false,
  other: "",
});

const schema = yup.object().shape({
  reason: yup
    .string()
    .required(i18n.t("ERRORS.isRequired", { name: i18n.t("LABELS.reason") })),
  other: yup
    .mixed()
    .test(
      "other",
      t("ERRORS.isRequired", { name: t("LABELS.other reason") }),
      (values) => {
        if (initialValues.reason == "other") {
          if (values) {
            return true;
          }
        } else {
          return true;
        }
      }
    )
    .nullable(),
});

function handleSubmit(values) {
  const frmData = new FormData();
  if (values.reason == "other") {
    frmData.append("desc_cancel_reason", values.other || "");
  } else {
    frmData.append("cancel_reason_id", values.reason);
  }

  if (props.isReservation) {
    const id = props.reservationId || route.params.id;
    if (!id) {
      toast.error("Reservation id is missing");
      return;
    }
    $api
      .patch(`reservations/${id}/cancel`, frmData)
      .then((res) => {
        toast.success(res.data.message);
        emit("reload", res.data.data);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || e.message);
      });
  } else {
    const id = route.params.id;
    if (!id) {
      toast.error("Order id is missing");
      return;
    }
    $api
      .patch(`orders/${id}/cancel`, frmData)
      .then((res) => {
        emit("reload", res.data.data);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || e.message);
      });
  }
}

function getCancelReasons() {
  $api
    .get("cancel_reasons")
    .then((res) => {
      reasonsLoading.value = false;
      items.value = res.data.data;
    })
    .catch(() => (reasonsLoading.value = false));
}

onMounted(() => {
  getCancelReasons();
});
</script>

<style lang="scss">
.cancel-reason-checkout {
  height: calc(50vh - 10rem);
  overflow-y: auto;
  @apply mb-2;
}
</style>

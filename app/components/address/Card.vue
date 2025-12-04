<template>
  <base-card>
    <div
      class="flex flex-wrap items-start gap-2 rounded-xl border p-7 transition"
      :class="[
        isClickable ? 'cursor-pointer' : '',
        selected ? 'border-primary bg-primary/5' : 'border-gray-200'
      ]"
      @click="handleSelection"
    >
      <div
        class="flex size20 items-center justify-center rounded-md bg-gray-100 text-placeholder"
      >
        <Icon name="mdi:map-marker" class="size-15" />
      </div>
      <div class="flex flex-1 items-start justify-between">
        <div>
          <h5 class="mb-1 text-lg font-semibold">{{ item.title }}</h5>
          <p class="text-placeholder">{{ item.desc }}</p>
       
        </div>
        <div class="flex shrink-0 items-center gap-1">
          <address-add-new
            :in-edit="true"
            :item="item"
            @reload="emit('reload')"
          />
          <button type="button" class="p-2" @click.stop="confirmModal = true">
            <Icon name="mdi:trash-can-outline" class="size-7 text-red-500" />
          </button>
        </div>
      </div>
    </div>

    <teleport to="body">
      <general-confirm
        v-if="confirmModal"
        :title="$t('BUTTONS.deleteAddress')"
        :desc="$t('TITLES.deleteAddressDesc')"
        :confirm-btn="$t('BUTTONS.yesDelete')"
        :hideHeader="true"
        classes="pt-4"
        @close="confirmModal = false"
        @confirm="deleteAddress"
      />
    </teleport>
  </base-card>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useAppAuth } from "~/store/auth";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isClickable: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["reload", "select"]);
const confirmModal = ref(false);
const loading = ref(false);
const toast = useToast();
const { $api } = useNuxtApp();
const appAuth = useAppAuth();
const { t } = useI18n();

const handleSelection = () => {
  if (!props.isClickable) return;
  emit("select", props.item);
};

const deleteAddress = () => {
  if (loading.value) return;
  loading.value = true;
  $api
    .delete(`/address/${props.item.id}`)
    .then(() => {
      appAuth.getProfile();
      emit("reload");
      confirmModal.value = false;
    })
    .catch((e) => {
      toast.error(e?.response?.data?.message || t("ERRORS.somethingWrong"));
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>


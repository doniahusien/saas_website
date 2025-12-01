<template>
  <VeeField :name="name" v-slot="{ meta }">
    <div
      class="select_options_wrapper"
      :class="{
        error: !meta.valid && meta.touched,
      }"
    >
      <div
        class="title flex cursor-pointer flex-wrap items-center justify-between border-b-[1px] border-b-third pb-4 pt-4 font-light"
        @click.stop="openBranches()"
      >
        <p
          class="selectPlaceholder flex items-center gap-1"
          :class="currentValue ? 'text-text' : 'text-third'"
        >
          {{ currentValue ? currentValue?.name : placeholder }}
        </p>
      </div>
    </div>
    <VeeErrorMessage
      v-if="!meta.valid && meta.touched"
      :name="name"
      as="div"
      class="text-[16px] text-error"
    />
  </VeeField>
  <teleport to="body">
    <general-modal
      :persist="true"
      classes="!w-full md:!max-w-[700px]"
      titleClasses="!text-2xl"
      @close="branchesMenu = false"
      v-if="branchesMenu"
      :title="$t('TITLES.branches address')"
      :description="$t('LABELS.Please, Select your location')"
    >
      <div class="address-menu-checkout">
        <loader v-if="appStore.branchLoading" />
        <ul v-else-if="appStore.branches?.length">
          <checkout-branches-card
            @returned-data="setData"
            :selectedBranch="selectedBranch"
            :items="appStore.branches"
          />
        </ul>
        <div v-else class="flex h-full items-center justify-center">
          {{ $t("LABELS.no branches") }}
        </div>
      </div>
    </general-modal>
  </teleport>
</template>
<script setup>
import { useAppStore } from "~/stores/app";
const appStore = useAppStore();
const selectedBranch = ref(null);
const branchesMenu = ref(false);
const props = defineProps({
  name: {
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    required: false,
  },
  optionLabel: {
    default: "name",
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    required: true,
  },
});
const currentValue = ref(null);
const branchField = useField(props.name);

const emit = defineEmits(["click"]);

function setData(event) {
  selectedBranch.value = event.branch;
  branchesMenu.value = false;
  branchField.setValue(event.branch);
  currentValue.value = event.branch;
}

function openBranches() {
  branchesMenu.value = true;
  appStore.getBranches();
}

watch(
  () => props.modelValue,
  () => {
    currentValue.value = props.modelValue;
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style lang="scss">
.select_options_wrapper {
  &.error {
    .title {
      @apply border-error text-error;
    }
  }
}
</style>

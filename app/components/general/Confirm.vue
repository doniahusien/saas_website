<template>
  <div
    class="base-modal fixed left-0 top-0 z-150 flex h-screen w-screen items-center justify-center bg-[#00000083] px-3"
    @click="close"
  >
    <div
      class="base-modal-content relative w-full  overflow-y-auto rounded-3xl bg-[#fbfafc] md:w-fit "
      :class="classes"
      @click.stop
    >
      <div
        class="flex items-center justify-between gap-5 bg-white p-5"
        v-if="!hideHeader"
      >
        <button type="button" :class="iconColor" @click="emit('close')">
          <Icon name ="mdi:close"/>
        </button>
      </div>

      <div class="relative my-auto space-y-4 h-full overflow-x-hidden p-5">
        <h3 class="text-center text-2xl font-semibold" :class="titleClasses">
          {{ title }}
        </h3>
        <p
          v-if="desc"
          class="mx-auto max-w-100 text-center text-lg font-medium text-text-light"
        >
          {{ desc }}
        </p>
        <div class="mt-5 flex items-center justify-center gap-3">
          <button class="base-btn-white" type="button" @click="emit('close')">
            {{ cancelBtn ?? $t("BUTTONS.noKeepMe") }}
          </button>
          <button class="base-btn" type="button" @click="emit('confirm')">
            {{ confirmBtn }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  persist: {
    required: false,
    default: false,
  },
  title: {
    required: true,
  },
  desc: {
    required: false,
  },
  confirmBtn: {
    required: true,
  },
  cancelBtn: {
    required: false,
  },
  classes: {
    type: String,
    required: false,
    default: null,
  },
  titleClasses: {
    type: String,
    required: false,
    default: null,
  },
  iconColor: {
    type: String,
    required: false,
    default: null,
  },
  hideHeader: {
    default: false,
    required: false,
  },
});

const emit = defineEmits(["close", "confirm"]);

function close() {
  if (props.persist) return;

  emit("close");
}
</script>

<style lang="scss">
.base-modal {
  .base-modal-content {
    box-shadow: 0px 7px 58px 0px #b1b1b11a;
  }
}
.p-dropdown-panel {
  z-index: 1200 !important;
}
</style>

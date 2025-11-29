<template>
  <div
    class="base-modal px-3 bg-[#00000083] flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-100"
    :class="modalClass"
    @click="close"
  >
    <div
      class="base-modal-content max-h-[650px] min-h-[300px] overflow-y-auto rounded-3xl bg-[#fbfafc] relative"
      :class="classes"
      @click.stop
    >
    <div class="bg-website_white p-5 " v-if="!hideHeader">
      <div class="flex items-center justify-between gap-5" :class="closeBtnClass">
        <h3 v-if="title" class="text-lg font-semibold" :class="titleClasses">
          {{ title }}
        </h3>
        
        <button type="button" :class="iconColor" @click="emit('close')" v-if="hasCloseBtn">
          <Icon name="mdi:close"/>
        </button>
      </div>
      <p v-if="description" class="text-black">{{description}}</p>
    </div>

      <div class="my-auto h-full p-5 overflow-x-hidden relative" :class="contentClass">
        <slot />
        
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
  closeBtnClass: {
    required: false
  },
  contentClass: {
    required: false
  },
  modalClass: {
    required: false
  },
  description: {
    required: false
  },
  hasCloseBtn: {
    default: true,
    required: false
  },
  hideHeader: {
    default: false,
    required: false
  }
});

const emit = defineEmits(["close"]);

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

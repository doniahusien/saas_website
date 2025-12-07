<template>
 <div
  class="fixed top-0 left-0 bg-[#00000071] w-screen h-screen z-40 flex"
  @click="closingMenu"
>
<div class="side_menu bg-white w-full md:w-1/2 lg:w-1/3 fixed top-0 min-h-screen   overflow-y-auto rounded-s-0 md:rounded-s-3xl" :class="{ closing: closing }">
      <header
        class="px-3 flex items-center justify-between h-20 "
        @click.stop
      >
        <h3 class="capitalize font-bold text-3xl px-2" v-if="title">{{ title }}
          <span class="text-primary text-sm font-medium" v-if="number">{{ number }} 
          <span v-if="number==1">{{ $t("TITLES.item") }}</span>
          <span v-else>{{ $t("TITLES.items") }}</span>
        </span>
        </h3>
        <button class="text-3xl cursor-pointer text-black font-normal" type="button" @click="closingMenu">
          <Icon name="ic:outline-close"/>
        </button>
      </header>
      <div class="side-menu-content px-4 py-4 overflow-y-auto " @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  closeBtn: {
    required: false,
    default: true,
  },
  title: {
    required: false,
  },
  number: {
    required: false,
  },
});

const emit = defineEmits(["close"]);

const closing = ref(false);

function closingMenu() {
  closing.value = true;

  setTimeout(() => emit("close"), 300);
}
</script>

<style lang="scss">
.side-menu-content {
  overflow-y: auto;
}

.side_menu {
  animation: show-menu 0.3s forwards ease-in;

  &.closing {
    animation: hide-menu 0.3s forwards ease-in;
  }
}

/* Logical direction instead of "right" */
@keyframes show-menu {
  0% {
    inset-inline-end: -500px;
    opacity: 0;
  }
  100% {
    inset-inline-end: 0;
    opacity: 1;
  }
}

@keyframes hide-menu {
  0% {
    inset-inline-end: 0;
    opacity: 1;
  }
  100% {
    inset-inline-end: -500px;
    opacity: 0;
  }
}

</style>

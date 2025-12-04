<template>
  <div
    class="bg-bottom-right bg-no-repeat md:bg-[url('@/assets/media/images/bg2.png')]"
  >
    <div
      class="bg-position-[left_3rem_top] bg-no-repeat md:bg-[url('@/assets/media/images/bg.png')]"
      :class="mainBg"
    >
      <div
        class="container grid grid-cols-1 items-center gap-5 bg-top-left bg-no-repeat md:grid-cols-2"
      >
        <div class="size-full">
          <img
            :src="items.image"
            :alt="items.title"
            class="max-w-full mx-auto h-176 max-h-full w-130 rounded-full object-cover"
          
          />
        </div>
        <div
          class="w-150 space-y-5 bg-bottom-right bg-no-repeat"
          :class="class"
        >
          <h3
            class=" text-5xl font-extrabold"
          
            v-html="items.title || items.heading"
          ></h3>
          <div
            class=" font-thin text-third"
            v-html="items.desc ?? items.description"
          ></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    required: false,
  },
  button: {
    required: false,
    default: false,
  },
  class: {
    required: false,
  },
  mainBg: {
    required: false,
  },
  welcome: {
    required: false,
    default: false,
  }
});
</script>

<style lang="scss">
.subscribe_form {
  .input_wrapper {
    input {
      @apply rounded-full border-none;

      &:-internal-autofill-selected {
        background-color: #fff !important;
      }
    }
  }
}
</style>

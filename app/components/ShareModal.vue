<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-lg space-y-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Share This Item</h2>
          <Icon
            name="mdi:close"
            class="w-5 h-5 cursor-pointer hover:text-gray-600"
            @click="$emit('update:modelValue', false)"
          />
        </div>

        <div class="flex justify-between items-center text-center px-2">
          <div class="flex flex-col items-center space-y-1" @click="copyLink">
            <div
              class="bg-gray-100 hover:bg-gray-200 flex justify-center p-3 rounded-full transition cursor-pointer"
            >
              <Icon name="lucide:book-copy" class="w-6 h-6 text-btn" />
            </div>
            <p class="text-xs text-gray-700 mt-1">Copy Link</p>
          </div>

          <SocialShare
            network="whatsapp"
            :url="shareUrl"
            class="flex flex-col items-center space-y-1"
          >
           <template #icon>
              <Icon
                name="logos:whatsapp-icon"
                class="w-8 h-8 text-blue-600 hover:text-blue-700"
              />
            </template>
            <template #label>
              <p class="text-xs text-gray-700 mt-1">Whatsapp</p>
            </template>
          </SocialShare>

          <SocialShare
            network="facebook"
            :url="shareUrl"
            class="flex flex-col items-center space-y-1"
          >
            <template #icon>
              <Icon
                name="mdi:facebook"
                class="w-8 h-8 text-blue-600 hover:text-blue-700"
              />
            </template>
            <template #label>
              <p class="text-xs text-gray-700 mt-1">Facebook</p>
            </template>
          </SocialShare>

          <div
            class="flex flex-col items-center space-y-1 cursor-pointer"
            @click="openInstagram"
          >
            <div class="flex justify-center p-2">
              <Icon name="mdi:instagram" class="w-8 h-8 text-pink-500" />
            </div>
            <p class="text-xs text-gray-700">Instagram</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
});
defineEmits(["update:modelValue"]);

const shareUrl = ref("");
onMounted(() => {
  if (process.client) shareUrl.value = window.location.href;
});

function copyLink() {
  navigator.clipboard.writeText(shareUrl.value);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

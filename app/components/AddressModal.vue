<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-lg p-6 relative w-full max-w-lg mx-4"
      >
        <button
          class="absolute top-4 right-4 text-gray-600 hover:text-black"
          @click="$emit('update:modelValue', false)"
        >
          ✕
        </button>

        <h2 class="text-2xl font-bold mb-2">Branches Address</h2>
        <p class="text-gray-500 mb-6">Please, select your location</p>

        <div class="space-y-4">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectBranch(branch)"
            class="flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition hover:bg-gray-50"
            :class="selected?.id === branch.id ? 'border-btn bg-btn/5' : 'border-gray-200'"
          >
            <img
              :src="branch.image"
              alt="map"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold">{{ branch.name }}</p>
              <p class="text-sm text-gray-500">{{ branch.address }}</p>
            </div>
            <input
              type="radio"
              name="branch"
              :checked="selected?.id === branch.id"
              class="accent-btn"
            />
          </div>
        </div>

        <div class="mt-6">
          <button
            @click="confirm"
            class="w-full py-3 bg-btn text-white font-semibold rounded-full hover:bg-btn/80 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'select'])

const branches = [
  {
    id: 1,
    name: 'Burj Khalifa, Dubai Branch',
    address: 'Dubai mall and adjacent to burj khalifa, address',
    image: '/images/food1.png',
  },
  {
    id: 2,
    name: 'Abu Dhabi Branch',
    address:
      "Al Maryah Island at the core of Abu Dhabi's New International Financial Center",
    image: '/images/food2.png',
  },
]

const selected = ref(null)

const selectBranch = (branch: any) => {
  selected.value = branch
}

const confirm = () => {
  if (selected.value) {
    emit('select', selected.value)
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

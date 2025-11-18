<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        v-if="showModal1 == true"
        class="bg-light-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 h-120 mx-4" >
        <button
          class="absolute top-4 right-4 text-gray-600 hover:text-black"
          @click="$emit('update:modelValue', false)"
        >
          <Icon name="mdi:close" class="cursor-pointer w-6 h-6" />
        </button>
        <h2 class="text-2xl font-bold mb-4">Delivery Address</h2>
        <div class="space-y-4 bg-white">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="flex items-center gap-4 p-3 rounded-xl shadow-xs shadow-line cursor-pointer transition hover:bg-gray-50"
            :class="
              selected?.id === branch.id ? 'border-btn bg-btn/5' : 'border-gray-200'
            "
          >
            <NuxtImg
              :src="branch.image"
              alt="map"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold">{{ branch.name }}</p>
              <p class="text-sm text-placeholder">{{ branch.address }}</p>
            </div>
            <div>
              <Icon name="mynaui:edit-one" class="text-placeholder w-5 h-5" />
              <Icon name="ei:trash" class="text-red-400 w-6 h-6 cursor-pointer" />
            </div>
          </div>
        </div>

        <div class="mt-auto">
          <button
            @click="switchToModal2"
            class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
          >
            Add New Address
            <span class="w-4 h-4 flex justify-center items-center bg-white rounded-full"
              ><Icon name="entypo:plus" class="w-3 h-3 text-btn"
            /></span>
          </button>
        </div>
      </div>

        <ModalAddAddresModal v-else />
   
    </div>
  </transition>
</template>

<script setup>
const showModal1 = ref(true);
const showModal2 = ref(false);

const switchToModal2 = () => {
  showModal1.value = false;
  showModal2.value = true;
};
const { t, locale } = useI18n();

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "select"]);

const branches = [
  {
    id: 1,
    name: "Home1",
    address: "Dubai Mall, adjacent to Burj Khalifa",
    image: "/images/food1.png",
  },
  {
    id: 2,
    name: "Work",
    address:
      "Al Maryah Island at the core of Abu Dhabi's New International Financial Center",
    image: "/images/food2.png",
  },
];

const confirm = () => {};
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

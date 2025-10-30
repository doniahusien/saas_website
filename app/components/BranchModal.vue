<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 relative animate-fadeIn w-full max-w-md">
        <button
          @click="emit('update:modelValue', false)"
          class="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 class="text-2xl font-bold mb-4">Select Store</h2>

        <div v-if="loading" class="text-center text-gray-500 py-6">
          Loading branches...
        </div>

        <div v-else-if="error" class="text-center text-red-500 py-6">
          Failed to load branches
        </div>

        <div v-else class="flex flex-col gap-3 max-h-80 overflow-y-auto">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectedBranchId = branch.id"
            class="flex items-center gap-4 border rounded-xl p-3 cursor-pointer transition"
            :class="selectedBranchId === branch.id
              ? 'border-btn bg-primary/20'
              : 'border-gray-200 hover:bg-gray-100'"
          >
            <img
              :src="branch.image"
              alt="branch"
              class="w-16 h-16 object-cover rounded-full"
            />
            <div class="flex flex-col flex-1">
              <p class="font-semibold text-lg">{{ branch.name }}</p>
              <p class="text-sm text-gray-600">{{ branch.location_description }}</p>
            </div>
            <div
              class="w-5 h-5 rounded-full border flex items-center justify-center"
              :class="selectedBranchId === branch.id ? 'border-btn' : 'border-gray-300'"
            >
              <div
                v-if="selectedBranchId === branch.id"
                class="w-2.5 h-2.5 rounded-full bg-primary"
              ></div>
            </div>
          </div>
        </div>

       <!--  <button
          v-if="selectedBranchId"
          @click="confirmSelection"
          class="mt-4 w-full py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
        >
          Confirm Selection
        </button> -->
      </div>
    </div>
  </transition>
</template>
<script setup>
const { $api } = useNuxtApp();

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});
const emit = defineEmits(['update:modelValue', 'select']);

const branches = ref([]);
const loading = ref(false);
const error = ref(false);
const selectedBranchId = ref(null);

const fetchBranches = async () => {
  try {
    loading.value = true;
    error.value = false;
    const { data } = await $api.get('/branches');
    branches.value = data.data || [];
  } catch (err) {
    console.error('Error fetching branches:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const confirmSelection = () => {
  const selected = branches.value.find((b) => b.id === selectedBranchId.value);
  if (selected) {
    emit('select', selected);
    emit('update:modelValue', false);
  }
};

onMounted(() => {
  fetchBranches();
});
</script>

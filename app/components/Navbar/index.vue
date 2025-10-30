<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-white">
    <div class="flex items-center gap-10">
      <NuxtImg src="/logo.png" alt="logo" class="w-20 h-20 object-contain" />
      <NavbarNavLinks :isOpen="isOpen" />
    </div>
    <div class="flex items-center gap-6">
      <ul class="flex items-center gap-5">
        <li>
          <NuxtLink to="">
            <NuxtImg
              src="/images/icons/shopping.svg"
              alt="shopping"
              class="w-5 h-5 object-contain"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <NuxtImg
              src="/images/icons/bell.svg"
              alt="bell"
              class="w-5 h-5 object-contain"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <NuxtImg
              src="/images/icons/profile.svg"
              alt="profile"
              class="w-5 h-5 object-contain"
            />
          </NuxtLink>
        </li>
      </ul>

      <button @click="showSelect = true">
        <div class="flex text-start flex-col gap-3 max-h-20 overflow-hidden bg-white">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectedBranchId = branch.id"
            class="flex gap-4 rounded-xl p-3 cursor-pointer transition"
          >
            <NuxtImg
              :src="branch.image"
              alt="branch"
              class="w-10 h-10 object-cover rounded-full"
            />
            <div class="flex flex-col flex-1">
              <p class="font-semibold text-lg">{{ branch.name ?? "Branch  " }}</p>
              <p class="text-sm text-placeholder">
                {{ branch.location_description }}
                <span class="pl-3"> &#709; </span>
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>

    <BranchModal v-model="showSelect" @select="onBranchSelected" />
  </nav>
</template>

<script setup>
const isOpen = ref(false);
const showSelect = ref(false);
const branches = ref([]);
const loading = ref(false);
const error = ref(false);
const { $api } = useNuxtApp();
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const fetchBranches = async () => {
  try {
    loading.value = true;
    error.value = false;
    const { data } = await $api.get("/branches");
    branches.value = data.data || [];
  } catch (err) {
    console.error("Error fetching branches:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchBranches();
});
</script>

<style scoped>
nav {
  transition: all 0.3s ease;
}
</style>

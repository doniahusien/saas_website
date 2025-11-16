<template>
  <nav
    class="relative flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm"
  >
    <div class="flex items-center gap-6">
      <NuxtImg src="/logo.png" alt="logo" class="w-16 h-16 object-contain" />
      <ul class="hidden md:flex gap-3 lg:gap-8 text-base lg:text-lg">
        <li v-for="item in items" :key="item.to">
          <NuxtLink :to="item.to" class="hover:text-btn transition-colors">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-5">
      <ul class="hidden md:flex items-center gap-2 md:gap-5">
        <li>
          <NuxtLink to="">
            <NuxtImg src="/images/icons/shopping.svg" alt="shopping" class="w-5 h-5" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <NuxtImg src="/images/icons/bell.svg" alt="bell" class="w-5 h-5" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="">
            <NuxtImg src="/images/icons/profile.svg" alt="profile" class="w-5 h-5" />
          </NuxtLink>
        </li>
      </ul>

      <button
        @click="showSelect = true"
        class="hidden cursor-pointer md:flex text-left items-center gap-3 bg-white"
      >
        <NuxtImg
          v-if="selectedBranch?.image"
          :src="selectedBranch.image"
          alt="branch"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="flex flex-col">
          <p class="font-semibold text-base">
            {{ selectedBranch?.name ?? "Branch" }}
          </p>
          <p class="text-sm text-placeholder">
            {{ selectedBranch?.location_description || t("select_store") }}
            <Icon name="mdi-chevron-down" class="w-4 h-4" />
          </p>
        </div>
      </button>

      <button
        @click="toggle"
        class="cursor-pointer md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none"
      >
        <span v-if="!isOpen" class="text-3xl">
          <Icon name="fe:bar" />
        </span>
        <span v-else class="text-3xl">
          <Icon name="fe:close" />
        </span>
      </button>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50 md:hidden"
      >
        <ul class="flex flex-col text-lg font-din px-6 py-4 space-y-4">
          <li v-for="item in items" :key="item.to" class="hover:text-btn transition">
            <NuxtLink :to="item.to" @click="isOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
          
        </ul>
        <ul class="flex items-center px-6 py-4  gap-5">
          <li>
            <NuxtLink to="" class="cursor-pointer">
              <NuxtImg src="/images/icons/shopping.svg" alt="shopping" class="w-5 h-5" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="" class="cursor-pointer">
              <NuxtImg src="/images/icons/bell.svg" alt="bell" class="w-5 h-5" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="" class="cursor-pointer">
              <NuxtImg src="/images/icons/profile.svg" alt="profile" class="w-5 h-5" />
            </NuxtLink>
          </li>
        </ul>

        <div class="border-t mt-4 pt-4 px-6 pb-6">
          <button
            @click="showSelect = true"
            class="cursor-pointer w-full text-left flex items-center gap-3"
          >
            <NuxtImg
              v-if="selectedBranch?.image"
              :src="selectedBranch.image"
              alt="branch"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex flex-col">
              <p class="font-semibold text-base">
                {{ selectedBranch?.name }}
              </p>
              <p class="text-sm text-placeholder">
                {{ selectedBranch?.location_description || t("select_store") }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </transition>

    <BranchModal v-model="showSelect" @select="onBranchSelected" />
  </nav>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();

const isOpen = ref(false);
const showSelect = ref(false);
const selectedBranch = ref<any>(null);

const branchCookie = useCookie("selectedBranch", { sameSite: "lax" });

const toggle = () => (isOpen.value = !isOpen.value);

const onBranchSelected = (branch) => {
  selectedBranch.value = branch;
  branchCookie.value = branch;
};

onMounted(() => {
  if (!branchCookie.value) {
    showSelect.value = true;
  }
  if (branchCookie.value) {
    selectedBranch.value = branchCookie.value;
  }
});

const items = computed(() => [
  { label: t("nav.home"), to: localePath("/") },
  { label: t("nav.about"), to: localePath("/about") },
  { label: t("nav.reservation"), to: localePath("/reservation") },
  { label: t("nav.menu"), to: localePath("/menu") },
  { label: t("nav.contact"), to: localePath("/contact") },
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

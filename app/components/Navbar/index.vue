<template>
  <nav
    class="relative flex items-center justify-between px-8 md:px-16 py-5 bg-white shadow-sm"
  >
    <div class="flex items-center gap-8">
      <NuxtImg src="/logo.png" alt="logo" class="size-16 object-contain" />
      <ul class="hidden lg:flex gap-3 text-base">
        <li v-for="item in items" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="hover:text-btn transition-colors"
            :class="[isActive(item.to) ? 'text-btn' : '']"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-5">
      <ul class="text-btn flex justify-center items-center gap-3">
        <li class="icon">
          <Icon name="solar:heart-linear" class="size-6" />
        </li>
        <li @click="cartOpen = true" class="icon">
          <Icon name="solar:bag-5-outline" class="size-6" />
        </li>
        <li class="icon" v-if="isLoggedIn">
          <Icon name="solar:bell-outline" class="size-6" />
        </li>
        <li class="icon" v-if="isLoggedIn">
          <Icon name="mage:user" class="size-6" />
        </li>
      </ul>

      <button
        @click="showSelect = true"
        class="hidden cursor-pointer lg:flex text-left items-center gap-3 bg-white"
      >
        <NuxtImg
          v-if="selectedBranch?.image"
          :src="selectedBranch.image"
          alt="branch"
          class="size-14 rounded-full object-cover"
        />
        <div class="flex flex-col justify-between">
          <p class="font-semibold text-base">
            {{ selectedBranch?.name }}
          </p>
          <p class="text-sm text-placeholder">
            {{ selectedBranch?.location_description }}
            <!--  <Icon name="mdi-chevron-down" class="size-4" /> -->
          </p>
        </div>
      </button>

      <NuxtLink
        v-if="!isLoggedIn"
        :to="localePath('/auth/login')"
        class="base-btn hidden lg:flex"
      >
        <Icon name="flowbite:arrow-left-to-bracket-outline" class="text-2xl" />
        <span>{{ t("TITLES.log in") }}</span>
      </NuxtLink>

      <NuxtLink :to="switchPath" class="hidden lg:flex items-center text-btn">
        <Icon name="fluent:globe-48-filled" class="size-5" />
        <span> {{ t(`locale.${locale}`) }}</span>
      </NuxtLink>

      <button
        @click="toggle"
        class="cursor-pointer text-btn lg:hidden flex items-center justify-center size-10 rounded focus:outline-none z-80"
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
        class="space-y-6 fixed inset-0 z-50 p-6 bg-white text-black lg:hidden overflow-y-auto"
      >
        <button
          @click="showSelect = true"
          class="cursor-pointer flex text-start items-center gap-3 bg-white"
        >
          <NuxtImg
            v-if="selectedBranch?.image"
            :src="selectedBranch.image"
            alt="branch"
            class="size-14 rounded-full object-cover"
          />
          <div class="flex flex-col justify-between">
            <p class="font-semibold text-base">
              {{ selectedBranch?.name }}
            </p>
            <p class="text-sm text-placeholder">
              {{ selectedBranch?.location_description }}
              <!--  <Icon name="mdi-chevron-down" class="size-4" /> -->
            </p>
          </div>
        </button>

        <NuxtLink
          v-if="!isLoggedIn"
          :to="localePath('/auth/login')"
          class="base-btn flex items-center gap-2"
        >
          <Icon name="flowbite:arrow-left-to-bracket-outline" class="text-2xl" />
          <span>{{ t("TITLES.log in") }}</span>
        </NuxtLink>
        <ul class="flex flex-col text-base gap-4">
          <li v-for="item in items" :key="item.to" class="hover:text-btn transition">
            <NuxtLink :to="item.to" @click="isOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink :to="switchPath" class="flex items-center text-btn">
          <Icon name="fluent:globe-48-filled" class="size-5" />
          <span> {{ t(`locale.${locale}`) }}</span>
        </NuxtLink>
      </div>
    </transition>

    <ModalBranchModal
      v-model="showSelect"
      @select="onBranchSelected"
      :stores="allStores"
    />
    <Cart v-model="cartOpen" />
  </nav>
</template>

<script setup lang="ts">
import { useAppAuth } from "~/store/auth";
const { locale, t, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const targetLocale = computed(() => (locale.value === "ar" ? "en" : "ar"));
const switchPath = computed(() => switchLocalePath(targetLocale.value));

const appAuth = useAppAuth();
const localePath = useLocalePath();
const route = useRoute();
const isOpen = ref<boolean>(false);
const cartOpen = ref<boolean>(false);
const showSelect = ref<boolean>(false);

const isLoggedIn = appAuth.isLoggedIn;

const selectedBranch = useCookie<Branch | null>("selectedBranch");
const allStoresCookie = useCookie<string | null>("all_stores");
const allStores = computed<Branch[]>(() => {
  try {
    return allStoresCookie.value ? JSON.parse(allStoresCookie.value) : [];
  } catch {
    return [];
  }
});
const toggle = () => (isOpen.value = !isOpen.value);

const onBranchSelected = (branch: Branch) => {
  selectedBranch.value = branch;
};

onMounted(() => {
  if (!selectedBranch.value) {
    showSelect.value = true;
  }
});

const isActive = (to: string) => route.path === to;

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

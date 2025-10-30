<template>
  <nav class="relative flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm">
    <div class="flex items-center gap-6">
      <NuxtImg src="/logo.png" alt="logo" class="w-16 h-16 object-contain" />
      <ul class="hidden md:flex gap-8 font-din text-lg">
        <li v-for="item in items" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="hover:text-btn transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-5">
      <ul class="hidden md:flex items-center gap-5">
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
      <button @click="showSelect = true" class="hidden md:flex text-left">
        <div class="flex items-center gap-3 bg-white">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectedBranchId = branch.id"
            class="flex items-center gap-3 cursor-pointer"
          >
            <NuxtImg
              :src="branch.image"
              alt="branch"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex flex-col">
              <p class="font-semibold text-base">{{ branch.name ?? "Branch" }}</p>
              <p class="text-sm text-placeholder">
                {{ branch.location_description }}
                <span class="pl-2">&#709;</span>
              </p>
            </div>
          </div>
        </div>
      </button>

      <button
        @click="toggle"
        class="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none"
      >
        <span v-if="!isOpen" class="text-3xl">☰</span>
        <span v-else class="text-3xl">✕</span>
      </button>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50 md:hidden"
      >
        <ul class="flex flex-col text-lg font-din px-6 py-4 space-y-4">
          <li
            v-for="item in items"
            :key="item.to"
            class="hover:text-btn transition"
          >
            <NuxtLink :to="item.to" @click="isOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="border-t mt-4 pt-4 px-6 pb-6">
          <button @click="showSelect = true" class="w-full text-left">
            <div
              v-for="branch in branches"
              :key="branch.id"
              class="flex items-center gap-3 py-2"
            >
              <NuxtImg
                :src="branch.image"
                alt="branch"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div class="flex flex-col">
                <p class="font-semibold text-base">{{ branch.name ?? "Branch" }}</p>
                <p class="text-sm text-placeholder">{{ branch.location_description }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </transition>

    <BranchModal v-model="showSelect" @select="onBranchSelected" />
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const { t } = useI18n()
const localePath = useLocalePath()

const isOpen = ref(false)
const showSelect = ref(false)
const branches = ref([])
const loading = ref(false)
const error = ref(false)
const { $api } = useNuxtApp()

const toggle = () => {
  isOpen.value = !isOpen.value
}

const fetchBranches = async () => {
  try {
    loading.value = true
    error.value = false
    const { data } = await $api.get('/branches')
    branches.value = data.data || []
  } catch (err) {
    console.error('Error fetching branches:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBranches()
})

const items = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.reservation'), to: localePath('/reservation') },
  { label: t('nav.menu'), to: localePath('/menu') },
  { label: t('nav.contact'), to: localePath('/contact') },
])
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

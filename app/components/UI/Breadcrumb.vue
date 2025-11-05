<template>
  <div class="flex items-center gap-2 text-sm md:text-base text-gray-200">
    <NuxtLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
      {{ t("common.home") }}
    </NuxtLink>
    <Icon name="heroicons:chevron-right" class="w-4 h-4" />
    <span>{{ t(`pages.${cleanName}`) }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const route = useRoute();
const cleanName = route.name?.replace(/___[a-zA-Z]+$/, "").toLowerCase() || "";
</script>

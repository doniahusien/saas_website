<template>
  <menusSideMenu
    @close="emit('close')"
    :title="$t('LABELS.wishlist')"
    :number="appStore.favourites.length"
  >
    <div class="flex flex-col h-screen min-h-0"> 
      <div class="flex-1 min-h-0 overflow-y-auto"> 
        <ul v-if="appStore.favourites.length" class="space-y-4 p-4">
          <li v-for="fav in appStore.favourites" :key="fav.id" class="mb-4 last:mb-0">
            <favouriteFavCard :item="fav" />
          </li>
        </ul>

        <div v-else class="flex h-full flex-col items-center justify-center px-4">
          <div class="my-auto space-y-4 text-center">
            <h3 class="text-2xl font-bold">
              {{ $t("TITLES.No favourites") }}
            </h3>
            <p class="mx-auto max-w-140 text-black">
              {{ $t("TITLES.You dont have any items in your wishlist yet") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </menusSideMenu>
</template>
<script setup>
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const emit = defineEmits(["close"]);
</script>

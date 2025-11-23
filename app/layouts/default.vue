<template>
  <Html :lang="locale" :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale == 'ar' ? 'rtl' : 'ltr'">
      <div class="flex min-h-screen flex-col md:mb-0">
        <Navbar />
        <NoInternetConnection v-if="!isOnline" />
        <div v-else>
          <div class="app_wrapper" id="app_wrapper">
            <slot />
          </div>
        </div>
        <Footer class="mt-auto" />
      </div>
    </Body>
  </Html>
</template>

<script setup>
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const { locale } = useI18n();
const isOnline = ref(true);
const {$api}= useNuxtApp();

const selectedBranch = useCookie('selectedBranch', { sameSite: 'lax' });
const allStoresCookie = useCookie('all_stores');
const stores = ref([]);

async function getStores() {
  const res = await $api.get('/stores');
  const storesData = res.data?.data || [];
  if (storesData.length > 0) {
    if (!selectedBranch.value) {
      selectedBranch.value = storesData[0];
    }
    allStoresCookie.value = JSON.stringify(storesData);
    stores.value = storesData;
  }
}

onMounted(async () => {
  await appStore.getCarts();
  isOnline.value = window.navigator.onLine;
  window.addEventListener("online", () => {
    isOnline.value = true;
  });
  window.addEventListener("offline", () => {
    isOnline.value = false;
  });
  await getStores();
});


useSeoMeta({
  ogImage: "/logo.png",
  ogSiteName: "SaaS",
  description: "",
  keywords: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "/logo.png",
});

useHead({
  titleTemplate: () => "SaaS",
});
</script>

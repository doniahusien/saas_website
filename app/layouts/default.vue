<template>
  <Html :lang="locale" :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale == 'ar' ? 'rtl' : 'ltr'">
      <div class=" flex min-h-[100vh] flex-col md:mb-0">
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
const appStore= useAppStore();
const { locale } = useI18n();
const isOnline = ref(true);

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

onMounted(async() => {
  await appStore.getCarts();
  isOnline.value = window.navigator.onLine;
  window.addEventListener("online", () => {
    isOnline.value = true;
  });

  window.addEventListener("offline", () => {
    isOnline.value = false;
  });
});
</script>

<template>
  <Html :lang="locale" :dir="dir">
    <Body :dir="dir">
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
import {useAppAuth} from "~/store/auth";
const appStore = useAppStore();
const appAuth = useAppAuth();
const i18n = useI18n();
const locale = computed(() => i18n.locale.value);
const isOnline = ref(true);
const { $api } = useNuxtApp();
const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));
const selectedBranch = useCookie("selectedBranch", { sameSite: "lax" });
const allStoresCookie = useCookie("all_stores");
const stores = ref([]);

const settingsData = computed(() => appStore.getWebSettingsData);

async function getStores() {
  const res = await $api.get("/stores");
  const storesData = res.data?.data || [];
  if (storesData.length > 0) {
    if (!selectedBranch.value) {
      selectedBranch.value = storesData[0];
    }
    allStoresCookie.value = JSON.stringify(storesData);
    stores.value = storesData;
  }
}

/* function getSettings() {
  if (settingsData.value?.website_colors) {
    appStore.setDefultColor();
  }
} */

let headSettings = {
  titleTemplate: "",
  link: [],
  htmlAttrs: {
    lang: "",
  },
  meta: [],
  style: [],
};

function getSettings() {
  headSettings.titleTemplate = `%s - ${
    settingsData.value.website_setting?.website_title || ""
  }`;
  headSettings.link.push({
    rel: "icon",
    type: "image/png",
    href: settingsData.value.website_setting?.website_fav_icon,
  });
  headSettings.meta.push({
    name: "hostname",
    content: settingsData.value.website_setting?.website_host_name,
  });

  useHead(headSettings);
}

onBeforeMount(() => {
  getSettings();
});

watch(
  () => settingsData.value?.website_setting,
  () => {
    getSettings();
  }
);

onMounted(async () => {
  await appStore.getCountries();
  
  await appStore.getWebSettings();
  await appStore.getCmsPages();
  await appStore.getCarts();
  if (appAuth.userData) {
    await appStore.getNotifications();
  }
  await appAuth.getProfile();
  isOnline.value = window.navigator.onLine;
  window.addEventListener("online", () => (isOnline.value = true));
  window.addEventListener("offline", () => (isOnline.value = false));
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


</script>


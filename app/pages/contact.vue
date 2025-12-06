<template>
  <div class="mb-12 space-y-12">
     <Banner
      :bannerData="{ image: '/images/bg/order_bg.jpg', title: t(' contact.title') }"
    />
    <div class="container mx-auto">
      <div
        v-if="appStore.branchLoading"
        class="grid gap-2 md:grid-cols-2 2xl:grid-cols-3"
      >
      </div>

      <div
        v-else
        class=" grid grid-cols-1 justify-center gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(item, index) in appStore.branches"
          :key="index"
          class="m-auto"
        >
          <contact-us-card :items="item" />
        </div>
      </div>
    </div>
    <contact-us-form :locations="appStore.branches" />
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const i18n = useI18n();
const {t}= i18n;
const items = {
  image: "/cmsHeader.png",
  title: i18n.t("TITLES.contact us"),
  page: {
    name: i18n.t("TITLES.contact us"),
    path: "/contact-us",
  },
  slug: "/contact-us",
};

useHead({
  title: i18n.t("NAV.contact"),
});

onMounted(() => {
  appStore.getBranches();
});
</script>

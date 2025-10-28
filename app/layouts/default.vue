


<template>
   <Html :lang="locale" :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale == 'ar' ? 'rtl' : 'ltr'">
      <div class="mb-20 flex min-h-[100vh] flex-col md:mb-0">
    <!--     <Navbar /> -->
          <NoInternetConnection v-if="!isOnline" />
          <div v-else>
            <div class="app_wrapper" id="app_wrapper">
              <slot />
            </div>
          </div>
    <!--     <Footer class="mt-auto" /> -->
      </div>
    </Body>
  </Html>
</template> 

<script setup>
const { locale } = useI18n();
const isOnline = ref(true);

useSeoMeta({
  ogImage: "/logo.png",
  ogSiteName: locale.value === "ar" ? "" : "",
  description:
    locale.value === "ar"
      ? ""
:"",
  keywords:
    locale.value === "ar"
      ? ""
      : "",
  twitterTitle: locale.value === "ar" ? "" : "",
  twitterDescription:
    locale.value === "ar"
      ? ""
      : "",
  twitterImage: "/logo.png",
});

useHead({
  titleTemplate: (title) =>
    title
      ? `${title} | ${locale.value === "ar" ? "" : ""}`
      : locale.value === "ar"
      ? ""
      : "",
});


onMounted(() => {
  isOnline.value = window.navigator.onLine
  window.addEventListener('online', () => {
    isOnline.value = true
  })

  window.addEventListener('offline', () => {
    isOnline.value = false
  })
}) 
</script>

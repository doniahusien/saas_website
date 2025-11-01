<template>
  <Html :lang="locale" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="h-screen flex gap-5">
        <div class="container hidden xl:flex flex-col relative overflow-hidden">
          <img
            src="/images/bg/auth_bg.png"
            alt="Auth background"
            class="object-cover w-full h-full"
          />

          <NuxtLink
            :to="switchPath"
            class="absolute top-6 right-6 bg-white text-gray-800 flex items-center justify-center w-10 h-10 rounded-full shadow hover:bg-gray-100 transition"
          >
            {{ t(`locale.${locale}`) }}
          </NuxtLink>
        </div>
        <div class="container mx-auto flex items-center justify-center">
          <div>
            <slot />
          </div>
        </div>
      </div>
    </Body>
  </Html>
</template>

<script setup>
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const targetLocale = computed(() => (locale.value === "ar" ? "en" : "ar"));
const switchPath = computed(() => switchLocalePath(targetLocale.value));
</script>

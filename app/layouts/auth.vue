<template>
  <Html :lang="locale" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="min-h-screen flex">
        <div
          class="hidden w-1/2 xl:block bg-cover bg-no-repeat"
          style="background-image: url('/images/bg/auth_bg.png')"
        ></div>

        <div
          class="w-full h-screen xl:w-1/2 mx-auto  bg-website-white ps-4 md:ps-7 overflow-y-auto pe-4 md:pe-7 xl:pe-0 flex justify-center z-20 xl:-translate-x-8 flex-col rounded-3xl"
        >
          <div class="w-full md:w-116 mx-auto">
            <NuxtLink :to="localePath('/')" class="relative w-fit">
              <img class="!mb-6"  src="/logo.png" alt="logo" />
            </NuxtLink>
            <slot />
          </div>
        </div>
      </div>
    </Body>
  </Html>
</template>

<script setup>
const { locale, t } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const targetLocale = computed(() => (locale.value === "ar" ? "en" : "ar"));
const switchPath = computed(() => switchLocalePath(targetLocale.value));
</script>

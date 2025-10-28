<template>
   <Html :lang="locale" :dir="locale == 'ar' ? 'rtl' : 'ltr'">
    <Body :dir="locale == 'ar' ? 'rtl' : 'ltr'">
  <div class="flex min-h-[100vh]">
    <div class="auth_bg w-[650px] 3xl:w-[800px] hidden xl:flex flex-col relative">
      <img
        src="/images/bg/auth_bg.png"
        alt="Auth background"
        class="m-auto min-w-[130px]"
      />

      <NuxtLink :to="switchPath" class="absolute top-6 right-6 bg-white flex items-center gap-2 text-text w-10 h-10 rounded-full justify-center">
        {{ t(`locale.${locale}`) }}
      </NuxtLink>
    </div>

    <div
      class="max-w-[600px] px-10 p-4 w-full auth_wrapper flex flex-col mx-auto space-y-9 overflow-y-auto"
    >
      <slot />
    </div>
  </div>
    </Body>
  </Html>

</template>

<script setup>
const { locale,t, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const targetLocale = computed(() => locale.value === 'ar' ? 'en' : 'ar')
const switchPath = computed(() => switchLocalePath(targetLocale.value))
</script>

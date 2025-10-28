<template>
  <footer
    v-if="data"
    class="relative px-5 py-16 text-white bg-cover bg-center bg-[url('/images/header4.jpg')]"
  >
    <div class="overlay"></div>

    <UContainer class="space-y-10 relative z-10">

      <div class="grid gap-1 md:grid-cols-[auto_1fr] md:items-center">
        <UILogo classes="w-16 h-16 md:w-28 md:h-28" />
        <div>
          <h2 class="text-2xl font-din font-bold">{{ $t('footer.title') }}</h2>
          <p class="text-sm text-light-gray">
            {{ footerDescription }}
          </p>
        </div>
      </div>

      <div class="border-t border-white/20 my-2"></div>

      <div class="grid gap-4 md:grid-cols-2 md:items-center">
        <div class="grid grid-flow-col auto-cols-max gap-6 text-sm text-banner-100 justify-self-start">
          <NuxtLink to="/terms" class="hover:text-gold">
            {{ $t('footer.terms') }}
          </NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-gold">
            {{ $t('footer.privacy') }}
          </NuxtLink>
        </div>

        <div class="grid grid-flow-col auto-cols-max gap-4 justify-self-end">
          <NuxtLink
            v-for="(social, index) in contactItems"
            :key="index"
            :to="social.value"
            target="_blank"
            rel="noopener noreferrer"
            class="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <BaseIcon
              :src="social.icon"
              wrapperClass="w-8 h-8"
              iconClass="w-5 h-5"
            />
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
const { locale } = useI18n()

const { data, pending, error } = await useAsyncData(
  'desc',
  () => useGlobalFetch('/preview'),
  { watch: [locale] }
)

const { data: info } = await useAsyncData(
  'info',
  () => useGlobalFetch('/preview/social'),
  { watch: [locale] }
)

const footerDescription = computed(
  () => data.value?.data?.footer_description || ''
)

const iconMap = {
  whatsapp: '/icons/whats.svg',
  phone: '/icons/phone.svg',
  x: '/icons/x.svg',
  instagram: '/icons/insta.svg',
  facebook: '/icons/face.svg',
}

const contactItems = computed(() => {
  const items = info.value?.data || []
  return items
    .filter((item) => iconMap[item.key])
    .map((item) => {
      let value = item.value
      if (['whatsapp', 'phone'].includes(item.key)) {
        const phone = value.replace(/\D/g, '')
        value = `https://wa.me/${phone}`
      }
      return {
        value,
        icon: iconMap[item.key],
      }
    })
})
</script>

<style scoped>
.text-banner-100 {
  color: #c8d1e0;
}
</style>

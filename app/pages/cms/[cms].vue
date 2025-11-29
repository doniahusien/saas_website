<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600"></p>
    </div>
  </div>

  <div v-else-if="error || !items?.data" class="min-h-screen flex items-center justify-center">
    <UINotFound />
  </div>

  <div v-else class="mb-8">
    <Banner
      :bannerData="{
        image: items.data.image || '/images/bg/order_bg.jpg',
        title: items.data.title || items.data.heading || t('orders.title')
      }"
    />

    <div class="mt-10 space-y-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <general-section
        v-if="items.image"
        :items="items.data"
      />
      <cms-section
        :items="items.data"
        v-else
      />

      <template  v-for="data in items.data.addition_data" :key="data.id">
        <general-section
          v-if="data.image"
          :items="data"
        />
        <cms-section
          v-else
          :items="data"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const { $api } = useNuxtApp();

const { data: items, pending, error, refresh } = await useAsyncData(
  () => `cms-page-${route.params.cms}`,
  () => $api.get(`cms-pages/${route.params.cms}`)
    .then(res => res.data)
    .catch(err => {
      const status = err.response?.status || 500;
      if (status === 404) return { status: 404 };
      throw err;
    }),
  {
    server: true,
    lazy: true,
    default: () => null
  }
);

watch(() => route.params.cms, () => {
  if (process.client) {
    refresh();
  }
}, { immediate: false });

// Update <title> tag
watchEffect(() => {
  if (items.value?.data?.title) {
    useHead({
      title: items.value.data.title,
      meta: [
        { name: 'description', content: items.value.data.desc?.replace(/<[^>]*>/g, '').slice(0, 160) }
      ]
    });
  }
});
</script>

<style scoped>
div.pb-8 {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
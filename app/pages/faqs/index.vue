<template>
  <div class="min-h-[90vh]">
        <Banner
      :bannerData="{ image: '/images/bg/order_bg.jpg', title: t('faqs.title') }"
    />
    <div id="faq_content">
      <FaqsDetails :items="faqItems"  />
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';

const i18n = useI18n();
const route = useRoute();
import { useAppAuth } from "~/store/auth";
const {$api} = useNuxtApp();
const appAuth = useAppAuth();
const userData = computed(() => appAuth.getUserData);
const { t } = useI18n();


const has_error = ref(false);

const faqItems = ref([]);
const loading = ref(false);

async function fetchFaqs() {
  loading.value = true;
  try {
    const res = await $api.get("faqs");
    const payload = res?.data;
    if (Array.isArray(payload)) {
      faqItems.value = payload;
    } else if (payload?.data && Array.isArray(payload.data)) {
      faqItems.value = payload.data;
    } else {
      faqItems.value = [];
    }
  } catch (e) {
    console.error("Failed to fetch faqs:", e);
    has_error.value = true;
    faqItems.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
    await fetchFaqs();
});
</script>

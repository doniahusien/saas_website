<script setup lang="ts">
const { locale,t } = useI18n();

/* const { data: faq, status, error } = await useAsyncData<ApiResponse<FAQResponse>>(
  "faq",
  () => useGlobalFetch<ApiResponse<FAQResponse>>("/preview/faq"),
  { watch: [locale] }
)

watch(faq, (newVal) => {
  if (newVal?.data?.banner) {
    useDynamicMeta({
      description: newVal.data.banner.description,
      image: newVal.data.banner.image,
    })
  }
}) */
const faq = [{question:'quetion',answer:"answer"},
  {question:'quetion',answer:"answer"},
  {question:'quetion',answer:"answer"}
]
</script>

<template>
  <!-- <UILoader v-if="status === 'pending'" />

 <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'"> -->

  <Banner :bannerData="{ image: '/images/bg/order_bg.jpg', title: t('faq.title') }" />
  <div class="text-black p-5 md:p-20">
 <FAQAccordion
      :faq="faq"
    /> 
  </div>
  <!-- 
 </template> -->
</template>

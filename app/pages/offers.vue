<script setup>
const { t } = useI18n();
</script>

<template>
  <div class="space-y-20 pb-10">
    <Banner
      :bannerData="{
        image: '/images/food1.png',
        title: 'Offers',
        subtitle: 'Home Offers',
      }"
    />
    <OffersSection />
  </div>
</template>

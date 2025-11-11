<template>
  <div v-if="offers.length" class="container mx-auto space-y-10 px-6 md:px-0">
    <div class="grid grid-cols-2 items-center">
      <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold">
        {{ $t("offers.title") }}
      </h2>
      <NuxtLink to="/offers" class="text-btn justify-self-end hover:underline">
        {{ $t("offers.viewAll") }}
        <Icon name="mdi:arrow-right" class="w-5 h-5 sm:w-6 inline-block align-middle" />
      </NuxtLink>
    </div>
    <Swiper
      :modules="[Autoplay, FreeMode]"
      :slides-per-view="1.2"
      :space-between="20"
      :breakpoints="{
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
        1280: { slidesPerView: 4.2 },
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      loop
      free-mode
      grab-cursor
    >
      <SwiperSlide v-for="item in offers" :key="item.id" class="w-full">
        <CardFoodCard
          :image="item.image"
          :title="item.name"
          :description="item.desc || 'No description available'"
          :rating="item.rating"
          :price="item.price.price_after"
          :oldPrice="item.price.price"
          :id="item.id"
          :currency="item.price.currency"
          :percentage="item.price.percentage"
          :offer="true"
          :isfav="item.is_favourite"
          :favourite_id="item.favourite_id"
          :slug="item.slug"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const { t } = useI18n();
defineProps({
  offers: Array,
});

</script>

<style scoped>
.swiper {
  transition-timing-function: linear !important;
}
</style>

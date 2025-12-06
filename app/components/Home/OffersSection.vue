<template>
  <div v-if="offers.length" class="container mx-auto px-6 md:px-0">
    <div class="grid grid-cols-2 items-center"  v-if="appStore.settingsData.website_customization?.offers == 'show'">
      <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold">
        {{ $t("offers.title") }}
      </h2>
      <NuxtLink
        :to="localePath('/offers')"
        class="text-primary justify-self-end hover:underline"
      >
        {{ $t("offers.viewAll") }}
        <Icon
          :name="isRTL ? 'mdi:arrow-left' : 'mdi:arrow-right'"
          class="size-5 sm:size-6 inline-block align-middle"
        />
      </NuxtLink>
    </div>
    <Swiper
      :modules="[Autoplay, FreeMode]"
      :slides-per-view="1"
      :space-between="20"
      :breakpoints="{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      loop
      free-mode
      grab-cursor
    >
      <SwiperSlide v-for="item in offers" :key="item.id" class="w-full my-10">
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
import { useAppStore } from "~/store/app";
const appStore = useAppStore();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const isRTL = computed(() => locale.value === "ar");
defineProps({
  offers: Array,
});
</script>

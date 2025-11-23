<template>
  <div v-if="products.length" class="container mx-auto space-y-10 px-6 md:px-0">
    <div class="grid grid-cols-2 items-center">
      <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold">
        {{ $t("menuSection.title") }}
      </h2>
      <NuxtLink :to='localePath("/menu")' class="text-btn justify-self-end hover:underline">
        {{ $t("menuSection.viewAll") }}
        <Icon
            :name="isRTL ? 'mdi:arrow-left' : 'mdi:arrow-right'"
          class="w-5 h-5 sm:w-6 sm:h-6 inline-block align-middle"
        />
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
      <SwiperSlide v-for="item in products" :key="item.id">
        <CardFoodCard
          :image="item.image"
          :title="item.name"
          :description="item.desc || 'No description available'"
          :rating="item.rating"
          :price="item.price.price"
          :currency="item.price.currency"
          :id="item.id"
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

const { t,locale } = useI18n();
const localePath = useLocalePath();
const isRTL = computed(() => locale.value === 'ar');

const props=defineProps({
  products:Array
})

</script>

<style scoped>
.swiper {
  transition-timing-function: linear !important;
}
</style>

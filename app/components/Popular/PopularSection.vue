<template>
  <div class="container mx-auto space-y-10">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold">
        {{ $t("popularSection.title") }}
      </h2>
      <NuxtLink to="/popular" class="text-btn flex items-center gap-2 hover:underline">
        {{ $t("popularSection.viewAll") }}
        <Icon name="mdi:arrow-right" class="w-5 h-5 sm:w-6 sm:h-6" />
      </NuxtLink>
    </div>

    <div class="py-10">
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
        <SwiperSlide
          v-for="item in foodItems"
          :key="item.id"
          class="flex justify-center gap-10"
        >
          <CardFoodCard
            :image="item.image"
            :title="item.title"
            :description="item.description"
            :rating="item.rating"
            :price="item.price"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const { t } = useI18n();

const foodItems = [
  {
    id: 1,
    image: "/images/food1.png",
    title: "Shish Tawook meal",
    description: "Pickled carrots + celery, tomatoes, cilantro, blue cheese, za'atar",
    rating: 4.5,
    price: "50.00",
    oldPrice: "75.00",
  },
  {
    id: 2,
    image: "/images/food1.png",
    title: "Kofta Plate",
    description: "Grilled kofta with tahini sauce and pita bread, served with fries",
    rating: 4.7,
    oldPrice: "85.00",
    price: "65.00",
  },
  {
    id: 3,
    image: "/images/food1.png",
    title: "Chicken Shawarma",
    description: "Tender chicken with garlic sauce, wrapped in soft bread with pickles",
    rating: 4.8,
    price: "55.00",
    oldPrice: "75.00",
  },
  {
    id: 4,
    image: "/images/food1.png",
    title: "Beef Burger",
    description: "Juicy beef patty, cheese, lettuce, tomato, and secret sauce",
    rating: 4.6,
    price: "75.00",
    oldPrice: "95.00",
  },
  {
    id: 5,
    image: "/images/food1.png",
    title: "Falafel Meal",
    description: "Crispy falafel with hummus, salad, and tahini sauce",
    rating: 4.4,
    price: "40.00",
    oldPrice: "60.00",
  },
];
</script>

<style scoped>
.swiper {
  transition-timing-function: linear !important;
}
</style>

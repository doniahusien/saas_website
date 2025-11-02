<template>
  <div class="container mx-auto space-y-10">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl md:text-3xl lg:text-5xl font-semibold">
        {{ $t("menuSection.title") }}
      </h2>
      <NuxtLink to="/menu" class="text-primary hover:underline">
        {{ $t("menuSection.viewAll") }}
      </NuxtLink>
    </div>
    <div
      class="flex overflow-x-auto w-full bg-white space-x-8 pb-4 scrollbar-hide scroll-smooth"
    >
      <CardFoodCard
        v-for="item in foodItems"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :rating="item.rating"
        :price="item.price"
        class="flex-shrink-0"
      />
    </div>
  </div>
</template>

<script setup>
const {t} = useI18n();
const foodItems = [
  {
    id: 1,
    image: "/images/food1.png",
    title: "Shish Tawook meal",
    description: "Pickled carrots + celery, tomatoes, cilantro, blue cheese, za'atar",
    rating: 4.5,
    price: "50.00",
  },
  {
    id: 2,
    image: "/images/food1.png",
    title: "Kofta Plate",
    description: "Grilled kofta with tahini sauce and pita bread, served with fries",
    rating: 4.7,
    price: "65.00",
  },
  {
    id: 3,
    image: "/images/food1.png",
    title: "Chicken Shawarma",
    description: "Tender chicken with garlic sauce, wrapped in soft bread with pickles",
    rating: 4.8,
    price: "55.00",
  },
  {
    id: 4,
    image: "/images/food1.png",
    title: "Beef Burger",
    description: "Juicy beef patty, cheese, lettuce, tomato, and secret sauce",
    rating: 4.6,
    price: "75.00",
  },
  {
    id: 5,
    image: "/images/food1.png",
    title: "Falafel Meal",
    description: "Crispy falafel with hummus, salad, and tahini sauce",
    rating: 4.4,
    price: "40.00",
  },
];
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

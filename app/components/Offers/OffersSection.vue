<template>
  <div class="container mx-auto space-y-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <CardFoodCard
        v-for="item in paginatedItems"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :rating="item.rating"
        :price="item.price"
        :offers="true"
      />
    </div>

    <UIPagination
      :items="foodItems"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @update:currentPage="updatePage"
    />
  </div>
</template>
<script setup>

defineProps({
  offers:Object
})
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
    image: "/images/food2.png",
    title: "Kofta Plate",
    description: "Grilled kofta with tahini sauce and pita bread, served with fries",
    rating: 4.7,
    price: "65.00",
  },
  {
    id: 3,
    image: "/images/food3.png",
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
   {
    id: 50,
    image: "/images/food2.png",
    title: "Falafel Meal",
    description: "Crispy falafel with hummus, salad, and tahini sauce",
    rating: 4.4,
    price: "40.00",
  },
  {
    id: 5,
    image: "/images/food5.png",
    title: "Falafel Meal",
    description: "Crispy falafel with hummus, salad, and tahini sauce",
    rating: 4.4,
    price: "40.00",
  },
];
const itemsPerPage = 6; 
const currentPage = ref(1); 

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return foodItems.slice(start, end);
});

function updatePage(page) {
  currentPage.value = page;
}
</script>

<script setup lang="ts">
const { t } = useI18n();

const foodItems = [
  {
    id: 1,
    image: "/images/food1.png",
    title: "Shish Tawook meal",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: false,
  },
  {
    id: 2,
    image: "/images/food2.png",
    title: "Grilled steak",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: false,
  },
  {
    id: 3,
    image: "/images/food3.png",
    title: "Supreme pizza",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: true,
    oldPrice: "65.00",
  },
  {
    id: 4,
    image: "/images/food4.png",
    title: "Grilled steak",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: false,
  },
  {
    id: 5,
    image: "/images/food5.png",
    title: "Shish Tawook meal",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: false,
  },
  {
    id: 6,
    image: "/images/food2.png",
    title: "Grilled steak",
    description: "Pickled carrots, celery, tomatoes, cilantro, blue cheese, za’atar",
    rating: 4.5,
    price: "50.00",
    offer: false,
  },
];

const itemsPerPage = 6;
const currentPage = ref(1);
const selectedTab = ref("all");

const categories = [
  { label: "All", value: "all" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Desserts", value: "desserts" },
  { label: "Drinks", value: "drinks" },
];

const filteredItems = computed(() => {
  if (selectedTab.value === "all") return foodItems;
  return foodItems.filter((item) =>
    item.title.toLowerCase().includes(selectedTab.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});
</script>

<template>
  <div class="space-y-20 pb-10">
    <Banner
      :bannerData="{
        image: '/images/food1.png',
        title: 'Menu',
      }"
    />

    <div class="container mx-auto px-2">
      <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_7fr] gap-16">
        <UIFilterSection />
        <section class="space-y-8">
          <UTabs
            v-model="selectedTab"
            :items="categories"
            :ui="{
              base: 'w-full',
              list: 'flex gap-2 bg-transparent rounded-full p-1',
              trigger: `hover:cursor-pointer bg-transparent rounded-full text-sm transition-colors duration-200
                        data-[state=active]:text-white data-[state=inactive]:text-secondary`,
              indicator:
                'absolute rounded-full bg-btn shadow-sm transition-[translate,width] duration-200',
            }"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-16">
            <CardFoodCard
              v-for="item in paginatedItems"
              :key="item.id"
              :image="item.image"
              :title="item.title"
              :description="item.description"
              :rating="item.rating"
              :price="item.price"
            />
          </div>

          <Pagination
            :items="filteredItems"
            :items-per-page="itemsPerPage"
            v-model:current-page="currentPage"
          />
        </section>
      </div>
    </div>
  </div>
</template>

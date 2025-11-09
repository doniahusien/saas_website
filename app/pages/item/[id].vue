<template>
  <div class="min-h-screen py-10 bg-gray-50">
    <div class="container mx-auto space-y-10 p-4 md:p-6">
      <h2 class="text-2xl md:text-3xl font-bold">{{$t('itemDetail')}}</h2>

      <ItemDetails
        title="Pepperoni Pizza"
        image="/images/food4.png"
        :rating="4.5"
        description="Cooked with vegetables in a rich curry coconut sauce served with coconut rice, Australian beef patty, tomatoes, onions, and lettuce served with homemade fries. Deconstructed millefeuille with wild fresh mixed berries, crème anglaise."
      />

      <ItemOptions />

      <ItemReviewSection
        :reviews="reviews"
        :overall-rating="overallRating"
        :total="total"
        :distribution="distribution"
      />
      <PopularSection
        v-if="popularProducts && popularProducts.length > 0"
        :products="popularProducts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n();
const reviews = [
  {
    id: 1,
    author: "Ali Nader",
    avatar: "https://i.pravatar.cc/150?u=nader",
    rating: 5,
    text: "This course is amazing. It is extremely thorough and in depth.",
    date: "2 days ago",
  },
  {
    id: 2,
    author: "Nada Ayman",
    avatar: "https://i.pravatar.cc/150?u=nada",
    rating: 5,
    text: "This food is amazing. It is extremely thorough and in depth.",
    date: "5 days ago",
  },
];

const overallRating = 4.5;
const total = reviews.length;
const distribution = [
  { stars: 4, percent: 75 },
  { stars: 3, percent: 20 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 0 },
];
const route = useRoute();
const id = route.params.id;

const branchCookie = useCookie('selectedBranch', { sameSite: 'lax' }) 
const storeId = computed(() => branchCookie.value?.id || null);

const { data, refresh } = await useAsyncData('data', () =>
  useGlobalFetch<any>('home', {
    headers: { os: 'web' },
    params: storeId.value ? { store_id: storeId.value } : {},
  })
)

watch(storeId, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    await refresh()
  }
})

const popularProducts = computed(() => data.value?.data?.popular_products || [])
</script>

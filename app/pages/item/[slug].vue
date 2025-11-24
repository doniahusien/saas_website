<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'">
    <div class="min-h-screen py-10 bg-gray-50">
      <div class="container mx-auto space-y-10 p-4 md:p-6">
        <h2 class="text-2xl md:text-3xl font-bold">{{ $t("itemDetail") }}</h2>

        <ItemDetails
          :title="item?.name"
          :image="item?.image"
          :rating="item?.rating"
          :id="item?.id"
          :description="
            item?.desc ||
            'Cooked with vegetables in a rich curry coconut sauce served with coconut rice...'
          "
          :isfav="item?.is_favourite"
          :favourite_id="item?.favourite_id"
          :slug="item?.slug"
        />

        <ItemOptions :productId="item?.id" :subModifiers="subModifiers" />

        <ItemReviewSection
          :reviews="reviews.data"
          :overall-rating="reviews.rate"
          :total="reviews.review_count"
          :distribution="distribution"
        />

        <PopularSection
          v-if="popularProducts && popularProducts.length > 0"
          :products="popularProducts"
        />
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useNuxtApp, useCookie } from "#imports";

const { t } = useI18n();
const route = useRoute();
const slug = route.params.slug as string;
const { $api } = useNuxtApp();
const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || 13);

const item = ref<Product | null>(null);
const popularProducts = ref<Product[]>([]);
const reviews = ref<any[]>({});
const overallRating = ref(0);
const total = ref(0);
const distribution = ref<{ stars: number; percent: number }[]>([]);
const status = ref<"pending" | "success" | "error">("pending");
const error = ref<any>(null);

const subModifiers = computed(() => item.value?.sub_modifiers || []);

onMounted(async () => {
  try {
    const itemRes = await $api.get<ApiResponse<Product>>(`product/${slug}`);
    item.value = itemRes.data.data;

    const homeRes = await $api.get<ApiResponse<HomeData>>("home");
    popularProducts.value = homeRes.data.data.popular_products || [];

    const reviewRes = await $api.get<ApiResponse<ReviewsResponse>>(`products/1/reviews`);
    reviews.value = reviewRes.data;

    distribution.value = (reviewRes.data.star_rate || []).map((s: any) => ({
      stars: parseInt(s.key.replace("star_", "")),
      percent: s.value,
    }));

    status.value = "success";
  } catch (err) {
    console.error(err);
    error.value = err;
    status.value = "error";
  }
});
</script>

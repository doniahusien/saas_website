<template>
  <UILoader v-if="status === 'pending'" />
  <UINotFound v-else-if="error?.statusCode === 404" />
  <UIBackError v-else-if="error?.statusCode === 500" />

  <template v-else-if="status === 'success'">
    <div class="min-h-screen py-10 bg-gray-50">
      <div class="container mx-auto space-y-10 p-4 md:p-6">
        <h2 class="text-2xl md:text-3xl font-bold">{{ $t("itemDetail") }}</h2>

        <ItemDetails
          :title="item?.data?.name"
          :image="item?.data?.image"
          :rating="item?.data?.rating"
          :id="item?.data?.id"
          :description="
            item?.data?.desc ||
            'Cooked with vegetables in a rich curry coconut sauce served with coconut rice...'
          "
          :isfav="item?.data?.is_favourite"
          :favourite_id="item?.data?.favourite_id"
          :slug="item?.data.slug"
        />

        <ItemOptions :productId="item?.data?.id" :subModifiers="subModifiers" />

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
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const branchCookie = useCookie<Branch | null>("selectedBranch");
const storeId = computed(() => branchCookie.value?.id || 13);

const { data: item,status,error } = await useAsyncData<ApiResponse<Product>>("itemData", () =>
  useGlobalFetch<ApiResponse<Product>>("product/" + slug, {
    headers: { os: "web", Authorization: `Bearer ${useCookie("jwt_token_saas").value}` },
    params: { store_id: storeId.value },
  })
);

const subModifiers = computed(() => {
  return item.value?.data?.sub_modifiers || [];
});

const sizeModifiers = computed(() => {
  return subModifiers.value.filter((mod) => mod.selections_type == "exact");
});

const optionModifiers = computed(() => {
  return subModifiers.value.filter((mod) => mod.selections_type == "min_max");
});

const { data } = await useAsyncData<ApiResponse<HomeData>>("homeData", () =>
  useGlobalFetch<ApiResponse<HomeData>>("home", {
    headers: { os: "web" },
    params: { store_id: storeId.value },
  })
);
const popularProducts = computed(() => data.value?.data?.popular_products || []);
const id = computed(() => item.value?.data?.id);

const { data: reviewResponse } = await useAsyncData<ApiResponse<ReviewsResponse>>(
  "reviewsData",
  () =>
    useGlobalFetch<ApiResponse<ReviewsResponse>>(`products/${id.value}/reviews`, {
      headers: { os: "web" },
      params: { store_id: storeId.value },
    })
);

const reviews = computed(() => {
  return (
    reviewResponse.value?.data?.map((r: any) => ({
      id: r.id,
      author: r.user?.full_name || "Anonymous",
      avatar: r.user?.avatar || "https://i.pravatar.cc/150?u=default",
      rating: r.rate,
      text: r.review || "",
      date: r.created_at,
    })) || []
  );
});

const overallRating = computed(() => reviewResponse.value?.rate || 0);
const total = computed(() => reviewResponse.value?.review_count || 0);

const distribution = computed(() => {
  const stars = reviewResponse.value?.star_rate || [];
  return stars.map((s: any) => ({
    stars: parseInt(s.key.replace("star_", "")),
    percent: s.value,
  }));
});
</script>

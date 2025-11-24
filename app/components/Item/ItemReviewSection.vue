<script setup lang="ts">
defineProps<{
  reviews: Array;
  overallRating: number;
  total: number;
  distribution: { stars: number; percent: number }[];
}>();
</script>

<template>
  <h2 class="text-3xl font-bold text-black">{{ $t("reviews.title") }}</h2>

  <div
    class="grid grid-cols-1 md:grid-cols-2 justify-center rounded-2xl shadow-sm items-center gap-8 border border-graish p-10"
  >
    <div class="space-y-4 px-7">
      <div class="flex flex-col items-center gap-4">
        <span class="text-4xl font-bold text-black">{{ overallRating }}</span>
        <div class="flex gap-3">
          <IconStar v-for="n in 5" :key="n" :filled="n <= Math.floor(overallRating)" />
        </div>
        <p class="text-sm text-black">
          {{ $t("reviews.totalReviews", { count: total }) }}
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="item in distribution"
          :key="item.stars"
          class="flex items-center gap-5 text-sm"
        >
          <span class="w-3 text-gray-600">{{ item.stars }}</span>
          <IconStar filled />
          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-yellow-400 transition-all"
              :style="{ width: `${item.percent}%` }"
            />
          </div>
          <span class="w-10 text-right text-gray-600">{{ item.percent }}%</span>
        </div>
      </div>
    </div>

    <div class="space-y-10">
      <article
        v-for="r in reviews"
        :key="r.id"
        class="flex flex-col gap-2 border-t border-t-graish"
      >
        <div class="flex gap-3 pt-5">
          <img
            :src="r.user.avatar"
            alt=""
            class="w-12 h-12 rounded-full object-cover bg-gray-200"
            loading="lazy"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-gray-900">{{ r.user.full_name }}</h4>
              <time class="text-sm text-gray-500">{{ r.created_at }}</time>
            </div>

            <div class="flex mb-2">
              <IconStar v-for="n in 5" :key="n" :filled="n <= r.rate" />
            </div>
          </div>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">{{ r.review }}</p>
      </article>

      <p v-if="reviews.length === 0" class="text-gray-400 text-sm text-center">
        {{ $t("reviews.noReviews") }}
      </p>
    </div>
  </div>
</template>

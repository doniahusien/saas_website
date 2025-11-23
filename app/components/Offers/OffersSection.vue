<script setup>
defineProps({
  offers: Array,
  paginationMeta: Object,
});

const emit = defineEmits(["updatePage"]);
</script>

<template>
  <div v-if="offers.length" class="container mx-auto space-y-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <CardFoodCard
        v-for="item in offers"
        :key="item.id"
        :image="item.image"
        :title="item.name"
        :description="item.desc || 'No description available'"
        :rating="item.rate || 0"
        :price="item.price.price_after"
        :oldPrice="item.price.price"
        :currency="item.price.currency"
        :percentage="item.price.percentage"
        :id="item.id"
        :offer="true"
        :isfav="item.is_favourite"
        :favourite_id="item.favourite_id"
        :slug="item.slug"
      />
    </div>
    <UIPagination
      :items="offers"
      :itemsPerPage="paginationMeta.per_page"
      :currentPage="paginationMeta.current_page"
      :totalItems="paginationMeta.total"
      @update:currentPage="(page) => emit('updatePage', page)"
    />
  </div>
</template>

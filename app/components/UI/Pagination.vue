<template>
  <div class="flex justify-center items-center gap-3 mt-10 flex-wrap">
    <button
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
      class="size-9 flex justify-center items-center rounded-full border-2 border-btn bg-white text-btn font-semibold cursor-pointer hover:bg-btn hover:text-white transition-colors disabled:bg-white disabled:border-btn disabled:text-btn disabled:cursor-not-allowed"
    >
     <Icon name="mdi:chevron-left" class="size-6" />
    <button
      v-if="currentPage > 3"
      @click="changePage(1)"
      class="size-9 flex justify-center items-center rounded-full border-2 border-btn font-semibold cursor-pointer hover:bg-btn hover:text-white transition-colors"
      :class="currentPage === 1 ? 'bg-btn text-white' : 'bg-white text-btn'"
    >
      1
    </button>
    </button>

    <span v-if="currentPage > 4" class="text-btn font-semibold mx-2">...</span>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      class="size-9 flex justify-center items-center rounded-full border-2 border-btn font-semibold cursor-pointer hover:bg-btn hover:text-white transition-colors"
      :class="currentPage === page ? 'bg-btn text-white' : 'bg-white text-btn'"
    >
      {{ page }}
    </button>

    <span v-if="currentPage < totalPages - 3" class="text-btn font-semibold mx-2">...</span>

    <button
      v-if="currentPage < totalPages - 2"
      @click="changePage(totalPages)"
      class="size-9 flex justify-center items-center rounded-full border-2 border-btn font-semibold cursor-pointer hover:bg-btn hover:text-white transition-colors"
      :class="currentPage === totalPages ? 'bg-btn text-white' : 'bg-white text-btn'"
    >
      {{ totalPages }}
    </button>

    <button
      :disabled="currentPage >= totalPages"
      @click="changePage(currentPage + 1)"
      class="size-9 flex justify-center items-center rounded-full border-2 border-btn bg-white text-btn font-semibold cursor-pointer hover:bg-btn hover:text-white transition-colors disabled:cursor-not-allowed"
    >
      <Icon name="mdi:chevron-right" class="size-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emit = defineEmits(["update:current-page"]);

const visiblePages = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});


function changePage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("update:current-page", page);
  }
}
</script>

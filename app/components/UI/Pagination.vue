<template>
  <div class="pagination-container flex justify-center items-center gap-3 mt-10 flex-wrap">
    <button
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
      class="pagination-arrow"
      :class="{ disabled: currentPage <= 1 }"
    >
      ←
    </button>
    <button
      v-if="currentPage > 3"
      @click="changePage(1)"
      class="pagination-number"
      :class="{ active: currentPage === 1 }"
    >
      1
    </button>

    <span v-if="currentPage > 4" class="ellipsis">...</span>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      class="pagination-number"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <span v-if="currentPage < totalPages - 3" class="ellipsis">...</span>

    <button
      v-if="currentPage < totalPages - 2"
      @click="changePage(totalPages)"
      class="pagination-number"
      :class="{ active: currentPage === totalPages }"
    >
      {{ totalPages }}
    </button>

    <button
      :disabled="currentPage >= totalPages"
      @click="changePage(currentPage + 1)"
      class="pagination-arrow"
      :class="{ disabled: currentPage >= totalPages }"
    >
      →
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

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
}

.pagination-arrow {
  background-color: white;
  border: 2px solid rgba(90, 106, 232, 1);  
  border-radius: 50%;  
  padding: 5px; 
  width: 30px;  
  height: 30px;
  cursor: pointer;
  color: rgba(90, 106, 232, 1);  
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-arrow:hover {
  background-color: rgba(90, 106, 232, 1);  
  color: white; 
}

.pagination-number {
  background-color: white;
  border: 2px solid rgba(90, 106, 232, 1); 
  border-radius: 50%;  
  padding: 8px;  
  margin: 0 8px;
  cursor: pointer;
  color: rgba(90, 106, 232, 1);  
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
  font-size: 16px;
  width: 30px; 
  height: 30px;  
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-number.active {
  background-color: rgba(90, 106, 232, 1);  
  color: white;  
}

.pagination-number:hover {
  background-color: rgba(90, 106, 232, 1);  
  color: white;  
}

.ellipsis {
  font-size: 16px;
  color: rgba(90, 106, 232, 1);
  margin: 0 8px;
  font-weight: 600;
}

.pagination-arrow:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination-container button:disabled {
  color: #e0e0e0;
}
</style>

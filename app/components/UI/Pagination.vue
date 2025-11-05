<template>
  <div class="pagination-container flex justify-center mt-5">
    <button
      v-if="currentPage > 1"
      @click="changePage(currentPage - 1)"
      class="pagination-arrow"
    >
      &lt;
    </button>

    <button
      v-if="currentPage > 2"
      @click="changePage(1)"
      class="pagination-number"
    >
      1
    </button>

    <span v-if="currentPage > 3" class="ellipsis">...</span>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      :class="{
        'pagination-number': true,
        'active': currentPage === page
      }"
    >
      {{ page }}
    </button>

    <span v-if="currentPage < totalPages - 2" class="ellipsis">...</span>

    <button
      v-if="currentPage < totalPages"
      @click="changePage(currentPage + 1)"
      class="pagination-arrow"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));

const visiblePages = computed(() => {
  let pages = [];
  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 3) {
      pages = [1, 2, 3, 4, 5];
    } else if (props.currentPage >= totalPages.value - 2) {
      pages = [totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value];
    } else {
      pages = [props.currentPage - 1, props.currentPage, props.currentPage + 1];
    }
  }
  return pages;
});

function changePage(page) {
  if (page > 0 && page <= totalPages.value) {
    emit('update:currentPage', page);
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

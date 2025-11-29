<template>
  <v-pagination
    v-if="pagination.last_page > 1"
    v-model="pagination.current_page"
    :pages="pagination.last_page"
    :hideFirstButton="false"
    :hideLastButton="false"
    :range-size="0"
    @update:modelValue="fetchData"
    :class="classes"
  />
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";

defineProps({
  pagination: {
    required: true,
  },
  classes: {
    required: false,
  },
});

const router = useRouter();
const route = useRoute();

function fetchData(e) {
  router.push({
    query: Object.assign({}, route.query, {
      page: e,
    }),
  });
}
</script>
<style lang="scss">
.Pagination {
  @apply my-7 flex justify-end;
  li {
    @apply mx-1;
    button {
      @apply flex h-5 w-5 items-center justify-center rounded-full border border-primary p-5 font-bold text-primary;
    }
    &.PaginationControl {
      @apply flex h-[42px] w-[42px] items-center justify-center rounded-full border border-primary rtl:rotate-180;
      svg {
        @apply w-[20px];
        path {
          fill: var(--website_primary_color) !important;
        }
        &.Control-active {
          @apply cursor-pointer;
        }
      }
    }

    &.PaginationControl:first-child,
    &.PaginationControl:last-child {
      @apply hidden;
    }
    &:has(.DotsHolder) {
      @apply flex h-5 w-5 items-center justify-center rounded-full border border-primary p-5;
      svg {
        @apply w-[15px];
        path {
          fill: var(--website_primary_color) !important;
        }
      }
    }

    button.Page.Page-active {
      @apply text-website_white;
      background-color: var(--website_primary_color) !important;
    }
  }
}
</style>

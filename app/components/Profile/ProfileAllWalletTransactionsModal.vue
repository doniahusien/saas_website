<template>
  <general-modal
    @close="emit('close')"
    :title="$t('TITLES.Cancelled Orders')"
    :persist="true"
    classes=" !w-full bg-white md:!max-w-163 !pb-5 !min-h-160"
    titleClasses="!text-2xl !font-bold"
  >
    <loader v-if="walletTransactionsLoading" />
    <template v-else>
      <div
        v-if="walletTransactions.length > 0"
        class=" zoomIn space-y-4"
      >
        <div v-for="item in walletTransactions" :key="item.id">
          <div class="flex justify-between">
            <div class="flex gap-4">
              <div>
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="max-h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="text-2xl font-medium">
                  {{ $t("TITLES.Order ID") }} - {{ item.id }}
                </h3>
                <p class="text-placeholder">
                  {{
                    new Date(item.created_at)
                      .toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                      .replace("at", "|")
                      .replace("pm", "PM")
                      .replace("am", "AM")
                  }}
                </p>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <p class="text-end text-2xl font-semibold">
                {{ item.amount }}
                <span class="mx-1 text-sm">{{ wallet?.currency ||'LE' }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="flex h-[20vh] items-center justify-center text-center">
          {{ $t("TITLES.No data in cancelled orders") }}
        </p>
      </div>
    </template>
  </general-modal>
</template>

<script setup>
const {t}= useI18n()

defineProps({
  walletTransactions: {
    required: true,
  },
  walletTransactionsLoading: {
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <general-modal
    @close="emit('close')"
    :title="$t('TITLES.Transactions History')"
    :persist="true"
    classes=" !w-full bg-white md:!max-w-163 pb-5 !min-h-160"
    titleClasses="!text-2xl !font-bold"
  >
    <loader v-if="loyaltyTransactionsLoading" />
    <template v-else>
      <div
        v-if="loyaltyTransactions.length > 0"
        class=" zoomIn space-y-4"
      >
        <div v-for="item in loyaltyTransactions" :key="item.id">
          <div class="flex flex-wrap justify-between">
            <div class="flex flex-wrap gap-4">
              <div>
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="max-h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="text-xl font-medium">
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
              <p class="text-2xl font-semibold">
                {{ item.points }}
                <span class="text-sm">{{ $t("TITLES.points") }}</span>
              </p>
              <div class="flex items-center justify-between">
                <p class="text-black">
                  {{ $t(`LABELS.${item.status}`) }}
                </p>
                <img
                  src="/icons/come_in.svg"
                  alt="come_in"
                  class="size-5"
                  v-if="item.status == 'come_in'"
                />
                <img
                  src="/icons/come_out.svg"
                  alt="come_out"
                  class="size-5"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <p class="flex items-center justify-center text-center">
          {{ $t("TITLES.No transactions") }}
        </p>
      </template>
    </template>
  </general-modal>
</template>

<script setup>
const {t}= useI18n()

defineProps({
  loyaltyTransactions: {
    required: true,
  },
  loyaltyTransactionsLoading: {
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

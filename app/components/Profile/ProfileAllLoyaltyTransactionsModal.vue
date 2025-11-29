<template>
  <general-modal
    @close="emit('close')"
    :title="$t('TITLES.Transactions History')"
    :persist="true"
    classes=" !w-full md:!max-w-[650px] !pb-5 !min-h-[600px]"
    titleClasses="!text-2xl !font-bold"
  >
    <loader v-if="loyaltyTransactionsLoading" />
    <template v-else>
      <div
        v-if="loyaltyTransactions.length > 0"
        class="animated wow zoomIn space-y-4"
        data-wow-duration="1.3s"
        data-wow-delay="0s"
      >
        <div v-for="item in loyaltyTransactions" :key="item.id">
          <div class="flex flex-wrap justify-between">
            <div class="flex flex-wrap gap-4">
              <div>
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="max-h-[82px] w-[82px] rounded-full object-cover"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="text-[22px] font-medium">
                  {{ $t("TITLES.Order ID") }} - {{ item.id }}
                </h3>
                <p class="text-third">
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
                <p class="text-third">
                  {{ $t(`LABELS.${item.status}`) }}
                </p>
                <img
                  src="@/assets/media/icons/come_in.svg"
                  alt="come_in"
                  class="h-[20px] w-[20px]"
                  v-if="item.status == 'come_in'"
                />
                <img
                  src="@/assets/media/icons/come_out.svg"
                  alt="come_out"
                  class="h-[20px] w-[20px]"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <p class="flex h-[20vh] items-center justify-center text-center">
          {{ $t("TITLES.No transactions") }}
        </p>
      </template>
    </template>
  </general-modal>
</template>

<script setup>
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

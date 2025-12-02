<template>
  <general-modal
    @close="emit('close')"
    :hideHeader="true"
    :persist="true"
    classes=" !w-full md:!max-w-163 bg-white !pb-5"
    closeBtnClass="!justify-end"
  >
    <div
      class="relative mx-auto h-80 w-full rounded-3xl bg-[url('/images/Card_Content.png')] object-cover text-white"
    >
      <h2
        class="fadeInLeft p-8 text-3xl font-semibold capitalize"
   
      >
        {{ userData.full_name }}
      </h2>
      <div
        class="fadeInLeft absolute bottom-0 p-8"
      >
        <p class="text-placeholder">{{ $t("LABELS.Loyalty Card") }}</p>
        <p>
          <span class="text-5xl font-bold">{{ loyalty.points }} </span>
          <span class="text-placeholder">{{ $t("TITLES.points") }}</span>
        </p>
      </div>
    </div>
    <div
      class=" my-10 flex flex-wrap justify-between">
      <h3 class="text-2xl font-bold">
        {{ $t("TITLES.Transaction History") }}
      </h3>
      <button
        class="text-lg text-placeholder cursor-pointer"
        type="button"
        @click="emit('seeAllLoyaltyTransactions')"
      >
        {{ $t("TITLES.see all") }}
      </button>
    </div>
    <loader v-if="loyaltyLoading" />
    <template v-else>
      <div
        v-if="loyalty.transactions.length > 0"
        class="fadeInLeft space-y-4"
      >
        <div v-for="item in loyalty.transactions" :key="item.id">
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
                <h3 class="text-2xl font-medium">
                  {{ $t("TITLES.Transaction ID") }} - {{ item.id }}
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
              <div class="flex items-center gap-5 justify-between">
                <p class="text-placeholder">
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
      <div v-else>
        <p class="flex  items-center justify-center text-center">
          {{ $t("TITLES.No transactions") }}
        </p>
      </div>
    </template>
  </general-modal>
</template>

<script setup>
const {t}= useI18n()

defineProps({
  loyalty: {
    required: true,
  },
  userData: {
    required: true,
  },
  loyaltyLoading: {
    required: true,
  },
});

const emit = defineEmits(["close", "seeAllLoyaltyTransactions"]);
</script>

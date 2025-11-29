<template>
  <general-modal
    @close="emit('close')"
    :hideHeader="true"
    :persist="true"
    classes=" !w-full md:!max-w-[650px] !pb-5"
    closeBtnClass="!justify-end"
  >
    <div
      class="relative mx-auto h-[317px] w-full rounded-3xl bg-[url('@/assets/media/images/Card_Content.png')] object-cover text-website_white"
    >
      <h2
        class="animated wow fadeInLeft p-8 text-3xl font-semibold capitalize"
        data-wow-duration="1.3s"
        data-wow-delay="0s"
      >
        {{ userData.full_name }}
      </h2>
      <div
        class="animated wow fadeInLeft absolute bottom-0 p-8"
        data-wow-duration="1.3s"
        data-wow-delay="0s"
      >
        <p class="text-third">{{ $t("LABELS.Loyalty Card") }}</p>
        <p>
          <span class="text-[48px] font-bold">{{ loyalty.points }} </span>
          <span class="text-third">{{ $t("TITLES.points") }}</span>
        </p>
      </div>
    </div>
    <div
      class="animated wow fadeInLeft my-5 flex flex-wrap justify-between"
      data-wow-duration="1.3s"
      data-wow-delay="0s"
    >
      <h3 class="text-2xl font-bold">
        {{ $t("TITLES.Transaction History") }}
      </h3>
      <button
        class="text-lg text-third"
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
        class="animated wow fadeInLeft space-y-4"
        data-wow-duration="1.3s"
        data-wow-delay="0s"
      >
        <div v-for="item in loyalty.transactions" :key="item.id">
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
                  {{ $t("TITLES.Transaction ID") }} - {{ item.id }}
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
      <div v-else>
        <p class="flex h-[20vh] items-center justify-center text-center">
          {{ $t("TITLES.No transactions") }}
        </p>
      </div>
    </template>
  </general-modal>
</template>

<script setup>
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

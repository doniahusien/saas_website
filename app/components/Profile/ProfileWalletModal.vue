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
        <p class="text-secondary">{{ $t("TITLES.balance") }}</p>
        <p>
          <span class="text-[48px] font-bold">{{ wallet.balance }} </span>
          <span class="mx-1 text-secondary">{{ wallet.currency }}</span>
        </p>
      </div>
    </div>
    <div
      class="animated wow fadeInLeft my-5 flex flex-wrap justify-between"
      data-wow-duration="1.3s"
      data-wow-delay="0s"
    >
      <h3 class="text-2xl font-bold">
        {{ $t("TITLES.Cancelled Orders") }}
      </h3>
      <button
        class="text-lg text-third"
        type="button"
        @click="emit('seeAllWalletTransactions')"
      >
        {{ $t("TITLES.see all") }}
      </button>
    </div>
    <loader v-if="walletLoading" />
    <template v-else>
      <div
        v-if="wallet.transactions?.length > 0"
        class="animated wow fadeInLeft space-y-4"
        data-wow-duration="1.3s"
        data-wow-delay="0s"
      >
        <div v-for="item in wallet.transactions" :key="item.id">
          <div class="flex justify-between">
            <div class="flex gap-x-4">
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
              <p class="text-end text-2xl font-semibold">
                {{ item.amount }}
                <span class="mx-1 text-sm">{{ wallet.currency }}</span>
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
defineProps({
  wallet: {
    required: true,
  },
  userData: {
    required: true,
  },
  walletLoading: {
    required: true,
  },
});

const emit = defineEmits(["close", "seeAllWalletTransactions"]);
</script>

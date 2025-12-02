<template>
  <general-modal
    @close="emit('close')"
    :hideHeader="true"
    :persist="true"
    classes=" !w-full md:!max-w-163 !pb-5 bg-white"
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
        <p class="text-placeholder">{{ $t("TITLES.balance") }}</p>
        <p>
          <span class="text-lg font-bold">{{ wallet.balance }} </span>
          <span class="mx-1 text-placeholder">{{ wallet.currency }}</span>
        </p>
      </div>
    </div>
    <div
      class=" zoomIn my-5 flex flex-wrap justify-between"
     
    >
      <h3 class="text-2xl font-bold">
        {{ $t("TITLES.Cancelled Orders") }}
      </h3>
      <button
        class="text-lg text-placeholder cursor-pointer"
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
        class=" zoomIn space-y-4"
      >
        <div v-for="item in wallet.transactions" :key="item.id">
          <div class="flex justify-between">
            <div class="flex gap-x-4">
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
const {t}= useI18n()
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

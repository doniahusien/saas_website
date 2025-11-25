<template>
  <div
    class="rounded-3xl bg-white mt-5 p-5"
  >
    <div class="mb-3 grid grid-cols-2 items-center justify-between">
      <p class="text-secondary" v-if="item.type == 'reservation'">
        {{ item.name }}
      </p>
      <p class="text-secondary" v-else>
        {{ $t("TITLES.order") }} #{{
          item.type == "reservation" ? item.id : item.order_num
        }}
      </p>
      <p
        class="ms-auto h-fit w-fit rounded-full bg-btn-bg px-4 py-2 capitalize text-btn"
      >
        <span v-if="item.type == 'reservation'">{{
          $t("TITLES.Table reservation")
        }}</span>
        <span v-else>
          {{ $t(`TITLES.${item.order_type}`) }}
        </span>
      </p>
    </div>


    <div class="flex flex-wrap justify-between">
      <div class="flex flex-wrap gap-2">
        <div>
          <div v-if="item.type == 'reservation'">
            <img
              :src="item.store?.image"
              :alt="item.store?.name"
              class="size-16 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div
            class="flex min-h-16 flex-wrap gap-2"
            v-else-if="item.type == 'order'"
          >
            <div
              v-for="(img, index) in item.item.slice(0, 3)"
              :key="index"
              class="-ms-9 first:ms-0"
            >
              <img
                :src="img.product.image"
                :alt="img.product.title"
                class="size-16 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div
              v-if="item.item.length > 3"
              class="-ml-9 size-16 rounded-full border-4 border-white bg-black opacity-90"
            >
              <span
                class="flex h-full items-center justify-center text-website_white"
              >
                + {{ item.item.length - 3 }}
              </span>
            </div>
          </div>
          <p class="text-center text-secondary" v-if="item.type == 'reservation'">
            ({{ item.guests_number }}
            {{
              item.guests_number > 1
                ? $t("TITLES.persons")
                : $t("TITLES.person")
            }})
          </p>
          <p v-else class="text-center text-secondary">
            ({{ item.item_count }}
            {{ item.item_count > 1 ? $t("TITLES.items") : $t("TITLES.item") }})
          </p>
        </div>

        <div v-if="item.type == 'reservation'" class="min-h-16">
          <p class="font-semibold">{{ $t("TITLES.Table reservation") }}</p>
          <p class="text-third">{{ item.store?.complete_name }}</p>
        </div>
        <div v-else>
          <p class="font-semibold" v-if="item.order_type == 'take_away'">
            {{ item.store?.complete_name }}
          </p>
          <p
            class="font-semibold capitalize"
            v-if="item.order_type == 'delivery'"
          >
            {{ item.address.title }}
          </p>
          <p
            class="text-secondary"
            v-for="(product, index) in item.item.slice(0, 3)"
            :key="index"
          >
            {{ product.product.name }}
          </p>
          <span class="text-secondary" v-if="item.item.length > 3">...</span>
        </div>
      </div>
      <NuxtLink
        :to="
          item.type == 'reservation'
            ? `reservation/${item.id}`
            : `orders/${item.id}`
        "
        class="ms-auto mt-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-btn text-white"
      >
        <Icon name="basil:arrow-right-outline" class="size-5" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    required: true,
  },
});
</script>

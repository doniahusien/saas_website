<template>
  <div class="rounded-3xl bg-website-white p-5">
    <div class="grid grid-cols-2 items-center justify-between">
      <p class="text-third" v-if="item.type == 'reservation'">
        {{ item.name }}
      </p>
      <p class="text-third" v-else>
        {{ $t("TITLES.order") }} #{{
          item.type == "reservation" ? item.id : item.order_num
        }}
      </p>
      <p class="ms-auto h-fit w-fit rounded-full bg-secondary px-4 py-2 capitalize text-primary">
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
          <div class="flex min-h-16 flex-wrap gap-2" v-else-if="item.type == 'order'">
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
              <span class="flex h-full items-center justify-center text-website-white">
                + {{ item.item.length - 3 }}
              </span>
            </div>
          </div>
          <p class="text-center text-third" v-if="item.type == 'reservation'">
            ({{ item.guests_number }}
            {{ item.guests_number > 1 ? $t("TITLES.persons") : $t("TITLES.person") }})
          </p>
          <p v-else class="text-center text-third">
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
          <p class="font-semibold capitalize" v-if="item.order_type == 'delivery'">
            {{ item.address.title }}
          </p>
          <p
            class="text-third"
            v-for="(product, index) in item.item.slice(0, 3)"
            :key="index"
          >
            {{ product.product.name }}
          </p>
          <span class="text-third" v-if="item.item.length > 3">...</span>
        </div>
      </div>
      <NuxtLink
        :to="
          localePath(
            item.type === 'reservation'
              ? `/reservations/${item.id}`
              : `/orders/${item.id}`
          )
        "
        class="ms-auto cursor-pointer mt-auto flex size-13 items-center justify-center rounded-full bg-primary text-website-white transition-colors"
      >
    
        <Icon
          :name="isRTL ? 'basil:arrow-left-outline' : 'basil:arrow-right-outline'"
          class="size-5"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();

const isRTL = computed(() => locale.value === "ar");

defineProps({
  item: {
    required: true,
  },
});
</script>

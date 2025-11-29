<template>
  <base-card v-if="item">
    <div class="flex flex-wrap items-start gap-2">
      <img
        :src="item.image"
        width="123"
        height="116"
        class="h-30 w-30 rounded-lg object-cover"
        alt="map image"
      />
      <div class="flex flex-1 items-start justify-between">
        <NuxtLink :to="localePath(`/item/${item.slug}`)">
          <div class="flex min-h-30 flex-col justify-between">
            <div>
              <h5 class="text-lg font-semibold">{{ item.name }}</h5>
              <p class="text-sm font-light text-black">{{ item.desc }}</p>
            </div>
            <div class="flex flex-wrap justify-between">
              <div v-if="item.price?.offer">
                <p class="font-medium text-black">
                  <span class="text-xl line-through">{{
                    item.price?.price || 0
                  }}</span
                  ><span class="mx-1 text-sm line-through">{{
                    item.price?.currency
                  }}</span>
                </p>
                <span class="text-3xl font-extrabold"
                  >{{ item.price?.price_after || 0 }}
                </span>
                <span class="mx-1 text-sm font-extrabold">
                  {{ item.price?.currency }}</span
                >
              </div>
              <div v-else>
                <h5 class="mb-1 text-lg font-semibold">
                  <span class="text-2xl font-semibold">{{
                    item.price?.price || 0
                  }}</span>
                  <span class="mx-1 text-sm font-semibold">{{
                    item.price?.currency
                  }}</span>
                </h5>
              </div>
            </div>
          </div>
        </NuxtLink>
        <div class="flex shrink-0 items-center gap-1">
          <button type="button" class=" cursor-pointer" @click.stop="confirmModal = true">
           <Icon name="mynaui:trash" class="text-red-500 size-7"/>
          </button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <general-confirm
        v-if="confirmModal"
        :title="$t('BUTTONS.removeFav')"
        :desc="$t('TITLES.deleteFavDesc')"
        :confirm-btn="$t('BUTTONS.yesRemove')"
        @close="confirmModal = close"
        @confirm="removeFav"
        :hideHeader="true"
        classes="pt-4"
      />
    </teleport>
  </base-card>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { useToast } from "vue-toastification";
const toast = useToast();
const {$api} = useNuxtApp();
const localePath= useLocalePath();
const appStore = useAppStore();
const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
});

const product_fav = computed(() => appStore.product_fav);
const confirmModal = ref(false);
const loading = ref(false);
const emit = defineEmits(["reload"]);
function removeFav() {
  $api.delete("favourite/" + props.item.favourite_id)
    .then(() => {
      appStore.favourites = appStore.favourites.filter(
        fav => fav.id !== props.item.id
      );
      appStore.getFavourites();

      confirmModal.value = false;
    })
    .catch((e) => {
      toast.error(e.response.data.message);
    });
}
</script>
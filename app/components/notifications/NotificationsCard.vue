<template>
  <base-card>
    <div class="flex flex-wrap items-start gap-x-2 md:gap-x-5">
      <NuxtLink
        :to="
          item.notify_type == 'order'
            ? localePath(`/orders/${item.notify_id}`)
            : ''
        "
        @click="appStore.unreadNotification = 0"
      >
        <img
          src="/images/food2.png"
          width="112"
          height="112"
          class=" rounded-md"
          :alt="item.title"
        />
      </NuxtLink>
      <div class="flex flex-1 items-start justify-between">
        <NuxtLink
          :to="
            item.notify_type == 'order'
              ? localePath(`/orders/${item.notify_id}`)
              : ''
          "
          @click="appStore.unreadNotification = 0"
        >
          <div class="flex  flex-col justify-between">
            <div>
              <h5 class="text-lg font-semibold">{{ item.title }}</h5>
              <p class="text-sm font-light text-black" v-html="item.body"></p>
            </div>
            <div class="flex flex-wrap justify-between">
              <div>
                <p class="flex items-end text-black">{{ item.time_ago }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div
        class="flex items-center justify-between gap-1 md:h-30 md:flex-col md:items-end"
      >
        <button type="button" @click.stop="confirmModal = true">
       <Icon name="mynaui:trash" class="text-red-500 size-7"/>
        </button>
        <button
          type="button"
          @click.stop="copy(item.code)"
          class="flex size-10.5 items-center justify-center rounded-full bg-secondary"
          v-if="item.notify_type == 'new_offer'"
        >
            <Icon name="solar:copy-line-duotone" class="text-2xl text-black" />
        </button>
      </div>
    </div>
    <teleport to="body">
      <general-confirm
        v-if="confirmModal"
        :title="$t('BUTTONS.deleteNotification')"
        :desc="$t('TITLES.deleteNotificationsDesc')"
        :confirm-btn="$t('BUTTONS.yesDelete')"
        @close="confirmModal = close"
        @confirm="deleteNotifications"
        :hideHeader="true"
        classes="pt-4"
      />
    </teleport>
  </base-card>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { useToast, POSITION } from "vue-toastification";
const toast = useToast();
const localePath = useLocalePath()
const {$api} = useNuxtApp();
const appStore = useAppStore();
const i18n = useI18n();
const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
});
const confirmModal = ref(false);
const loading = ref(false);
const emit = defineEmits(["reload"]);
function deleteNotifications() {
  loading.value = true;

  $api
    .delete("notifications/" + props.item.id)
    .then((res) => {
      toast.success(res.data.message);
      remove(props.item.id);
      confirmModal.value = false;
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;

      toast.error(e.response.data.message);
    });
}

function remove(id) {
  appStore.notifications = appStore.notifications.filter((el) => el.id != id);
}

function copy(item) {
  navigator.clipboard.writeText(item);
  toast.success(i18n.t("TITLES.code copied"), {
    timeout: 2000,
    position:
      i18n.locale.value == "en" ? POSITION.BOTTOM_RIGHT : POSITION.BOTTOM_LEFT,
  });
}
</script>

<style></style>

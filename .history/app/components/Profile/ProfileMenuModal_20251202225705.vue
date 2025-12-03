<template>
  <div
    class="fixed top-0 end-0 w-full md:w-1/2 lg:w-1/3 h-full bg-white z-80 px-4 py-8 flex flex-col gap-10 rounded-s-0 md:rounded-s-3xl"
  >
    <div class="flex justify-between items-center px-5">
      <h1 class="text-3xl md:text-4xl font-bold">{{ $t("TITLES.Profile") }}</h1>
      <button
        class="size-10 rounded-full hover:bg-gray-200 flex items-center justify-center"
        @click="emit('close')"
      >
        <UIcon name="i-mdi-close" class="text-3xl font-bold text-black" />
      </button>
    </div>
    <ul class="profile-menu branch-list overflow-y-auto space-y-7">
      <template v-for="(item, indx) in profileList" :key="indx">
        <li v-if="item.path">
          <NuxtLink
            :to="localePath(item.path)"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100"
          >
            <div
              class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
            >
              <div :class="item.path === '/order' ? 'strokeBlack' : ''">
                <Icon :name="item.icon" class="text-3xl text-black" />
              </div>
            </div>

            <span class="capitalize flex-1 font-medium">{{ item.name }}</span>

            <Icon
              :name="$i18n.locale === 'en' ? 'oui:arrow-right' : 'oui:arrow-left'"
              class="text-xl text-placeholder"
            />
          </NuxtLink>
        </li>

        <li v-if="item.name === 'address'">
          <button
            type="button"
            @click="emit('openAddress')"
            class="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gray-100"
          >
            <div
              class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
            >
              <Icon :name="item.icon" class="text-3xl text-black" />
            </div>

            <span class="flex-1 font-medium">
              {{ item.name }}
            </span>

            <Icon
              :name="$i18n.locale === 'en' ? 'oui:arrow-right' : 'oui:arrow-left'"
              class="text-xl text-placeholder"
            />
          </button>
        </li>

        <li v-if="item.name === t('LABELS.wishlist')">
          <button
            type="button"
            @click="emit('openWishlist')"
            class="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gray-100"
          >
            <div
              class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
            >
              <Icon :name="item.icon" class="text-3xl text-black" />
            </div>

            <span class="capitalize font-medium">{{ item.name }}</span>

            <Icon
              :name="$i18n.locale === 'en' ? 'oui:arrow-right' : 'oui:arrow-left'"
              class="text-xl ms-auto text-placeholder"
            />
          </button>
        </li>

        <li v-if="item.name == t('LABELS.notifications')">
          <button type="button" class="flex items-center w-full gap-4">
            <div
              class="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-light-gray p-3"
            >
              <div class="strokeBlack">
                <Icon :name="item.icon" class="text-3xl text-text" />
              </div>
            </div>

            <span class="capitalize flex-1 text-left">{{ item.name }}</span>

          <div class="ms-auto">
  <Switch
    @click.stop="emit('openNotifications')"
    :class="userData.notifiable ? 'bg-blue-600' : 'bg-gray-300'"
    class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
  >
    <!-- LTR (English) -->
    <span
      v-if="$i18n.locale == 'en'"
      :class="userData.notifiable ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
    />

    <!-- RTL (Arabic) -->
    <span
      v-else
      :class="userData.notifiable ? '-translate-x-6' : '-translate-x-1'"
      class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
    />
  </Switch>
</div>

          </button>
        </li>
        <li v-if="item.name === t('LABELS.loyalty Card')">
          <button
            type="button"
            @click="emit('openLoyaltyMenu')"
            class="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <div
              class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
            >
              <Icon :name="item.icon" class="text-3xl text-black" />
            </div>

            <span class="capitalize font-medium">{{ item.name }}</span>

            <div
              class="ms-auto bg-[#e9f4ec] px-3 py-1 rounded-full text-success flex items-center gap-1"
            >
              <span v-if="loyaltyLoading" class="walletLoader"></span>
              <span v-else>{{ loyalty.points }}</span>
              <span class="text-[12px]">{{ $t("TITLES.points") }}</span>
            </div>
          </button>
        </li>

        <li v-if="item.name === t('LABELS.wallet')">
          <button
            type="button"
            @click="emit('openWalletMenu')"
            class="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <div
              class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
            >
              <Icon :name="item.icon" class="text-3xl text-black" />
            </div>

            <span class="capitalize font-medium">{{ item.name }}</span>

            <div
              class="ms-auto bg-[#e9f4ec] px-3 py-1 rounded-full text-success flex items-center gap-1"
            >
              <span v-if="walletLoading" class="walletLoader"></span>
              <span v-else>{{ wallet.balance }}</span>
              <span class="text-sm capitalize">{{ wallet.currency }}</span>
            </div>
          </button>
        </li>
      </template>

      <li v-for="page in cmsPage" :key="page.id">
        <NuxtLink
          :to="localePath(`/cms/${page.slug}`)"
          class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <div
            class="flex size-14 items-center justify-center rounded-full bg-light-gray p-3"
          >
            <img :src="page.icon" width="26" height="26" :alt="page.title" />
          </div>

          <span class="flex-1 font-medium">{{ page.title }}</span>

          <Icon
            :name="$i18n.locale === 'en' ? 'oui:arrow-right' : 'oui:arrow-left'"
            class="text-xl text-black"
          />
        </NuxtLink>
      </li>

      <li>
        <button
          type="button"
          :disabled="deleteBtn"
          class="flex items-center gap-4 w-full text-error p-3 rounded-xl hover:bg-red-50 transition"
          @click="emit('deleteAccount')"
        >
          <div class="rounded-full bg-light-red p-3">
            <Icon name="mynaui:trash" class="text-2xl text-red-500" />
          </div>
          {{ t("BUTTONS.deleteAccount") }}
        </button>
      </li>

      <li>
        <button
          type="button"
          class="flex items-center gap-4 w-full text-error p-3 rounded-xl hover:bg-red-50 transition"
          @click="emit('logout')"
        >
          <div class="rounded-full bg-light-red p-3">
            <Icon name="solar:logout-2-outline" class="text-2xl" />
          </div>
          {{ t("BUTTONS.logout") }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Switch } from "@headlessui/vue";

const { t } = useI18n();
const localePath = useLocalePath();

defineProps({
  userData: { required: true },
  profileList: { required: true },
  deleteBtn: { required: true },
  loyalty: { required: true },
  loyaltyLoading: { required: false },
  walletLoading: { required: false },
  wallet: { required: true },
  cmsPage: { required: true },
});

const emit = defineEmits([
  "close",
  "openAddress",
  "openWishlist",
  "openNotifications",
  "openLoyaltyMenu",
  "openWalletMenu",
  "logout",
  "deleteAccount",
]);
</script>

<style lang="scss">
.walletLoader {
  @apply box-border inline-block size-[12px] animate-spin rounded-full border-[2px] border-success border-b-transparent;
}
</style>

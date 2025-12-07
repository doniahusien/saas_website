<template>
  <nav v-if="appStore.settingsData.website_customization?.top_bar_availability">
    <div class="container mx-auto mt-2 flex items-center gap-5 py-5">
      <NuxtLink
        :to="localePath('/')"
        :class="
          appStore.settingsData.website_customization?.top_bar_logo_position == 'right'
            ? 'order-1'
            : ''
        "
      >
        <NuxtImg
          :src="appStore.settingsData.website_setting?.website_logo"
          alt="logo"
          class="size-18 object-contain"
        />
      </NuxtLink>

      <div class="flex flex-1 items-center justify-between">
        <ul class="hidden lg:flex flex-wrap gap-3 text-lg">
          <li v-for="item in items" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="hover:text-primary transition-colors"
              :class="[isActive(item.to) ? 'text-primary' : '']"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <button class="cursor-pointer" @click="showReservation = true">
              {{ $t("nav.reservation") }}
            </button>
          </li>
           <li v-for="page in cmsPage" :key="page.id"
            :class="[isActive(localePath(`/cms/${page.slug}`)) ? 'text-primary' : '']">
            <NuxtLink :to="localePath(`/cms/${page.slug}`)">
              {{ page.title }}
            </NuxtLink>
          </li>
        </ul>

        <div class="flex ms-auto items-center gap-4">
          <ul class="text-primary flex gap-3">
            <button class="icon" @click.stop="openWishlist">
              <Icon name="solar:heart-linear" class="size-6" />
            </button>
            <li @click.stop="openCart" class="icon">
              <div class="relative inline-block">
                <Icon name="solar:bag-5-outline" class="size-6" />
                <span
                  class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full size-4 flex items-center justify-center px-1"
                >
                  {{ cartCount > 99 ? "99+" : cartCount }}
                </span>
              </div>
            </li>
            <li
              class="icon"
              v-if="isLoggedIn && userData?.notifiable"
              @click.stop="openNotifications"
            >
              <Icon name="solar:bell-outline" class="size-6" />
            </li>
            <button
              class="icon"
              v-if="isLoggedIn"
              @click.stop="
                profileMenu = true;
                getWallet();
                getLoyalty();
              "
            >
              <Icon name="mage:user" class="size-6" />
            </button>
          </ul>

          <button
            @click="showSelect = true"
            class="hidden cursor-pointer lg:flex text-left items-center gap-3 "
          >
            <NuxtImg
              v-if="selectedBranch?.image"
              :src="selectedBranch.image"
              alt="branch"
              class="size-16 rounded-full object-cover"
            />
            <div class="flex flex-col justify-between">
              <p class="font-semibold text-base">
                {{ selectedBranch?.name }}
              </p>
              <p class="text-sm text-placeholder">
                {{ selectedBranch?.location_description }}
                <!--  <Icon name="mdi-chevron-down" class="size-4" /> -->
              </p>
            </div>
          </button>

          <NuxtLink
            v-if="!isLoggedIn"
            :to="localePath('/auth/login')"
            class="base-btn hidden lg:flex"
          >
            <Icon name="flowbite:arrow-left-to-bracket-outline" class="text-2xl" />
            <span>{{ t("TITLES.log in") }}</span>
          </NuxtLink>

          <NuxtLink :to="switchPath" class="hidden lg:flex items-center text-primary">
            <Icon name="fluent:globe-48-filled" class="size-5" />
            <span> {{ t(`locale.${locale}`) }}</span>
          </NuxtLink>

          <button
            @click="toggle"
            class="cursor-pointer text-primary lg:hidden flex items-center justify-center size-10 rounded focus:outline-none z-999"
          >
            <Icon name="fe:bar" v-if="!isOpen" class="text-3xl" />
            <Icon name="fe:close" v-else class="text-3xl" />
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="space-y-6 inset-0 z-50 py-10 px-6 bg-white text-black lg:hidden overflow-y-auto relative"
      >
        <button
          @click="showSelect = true"
          class="cursor-pointer flex text-start items-center gap-3 bg-white"
        >
          <NuxtImg
            v-if="selectedBranch?.image"
            :src="selectedBranch.image"
            alt="branch"
            class="size-14 rounded-full object-cover"
          />
          <div class="flex flex-col justify-between">
            <p class="font-semibold text-base">
              {{ selectedBranch?.name }}
            </p>
            <p class="text-sm text-third">
              {{ selectedBranch?.location_description }}
              <!--  <Icon name="mdi-chevron-down" class="size-4" /> -->
            </p>
          </div>
        </button>

        <NuxtLink
          v-if="!isLoggedIn"
          :to="localePath('/auth/login')"
          class="base-btn flex items-center gap-2"
        >
          <Icon name="flowbite:arrow-left-to-bracket-outline" class="text-2xl" />
          <span>{{ t("TITLES.log in") }}</span>
        </NuxtLink>
        <ul class="flex flex-col text-base gap-4">
          <li v-for="item in items" :key="item.to" class="hover:text-primary transition">
            <NuxtLink :to="item.to" @click="isOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <button class="cursor-pointer" @click="showReservation = true">
              {{ $t("nav.reservation") }}
            </button>
          </li>
          <li v-for="page in cmsPage" :key="page.id">
            <NuxtLink :to="localePath(`/cms/${page.slug}`)">
              {{ page.title }}
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink :to="switchPath" class="flex items-center text-primary">
          <Icon name="fluent:globe-48-filled" class="size-5" />
          <span> {{ t(`locale.${locale}`) }}</span>
        </NuxtLink>
      </div>
    </transition>

    <teleport to="body">
      <general-modal
        @close="showReservation = false"
        v-if="showReservation"
        :persist="true"
        classes=" !w-full md:!max-w-250 !pb-0 !min-h-150"
        titleClasses="!text-2xl !font-bold"
        contentClass="!p-0 "
        class="reserve-modal"
      >
        <GeneralBookForm @close="showReservation = false" />
      </general-modal>
    </teleport>
    
    <teleport to="body">
      <favourite-modal v-if="wishlistMenu" @close="wishlistMenu = false" />
    </teleport>
    <ModalBranchModal
      v-model="showSelect"
      @select="onBranchSelected"
      :stores="allStores"
    />

    <teleport to="body">
      <Cart v-if="cartMenu" @close="cartMenu = false" />
    </teleport>

    <teleport to="body">
      <menus-side-menu
        v-if="notificationsMenu"
        @close="notificationsMenu = false"
        :title="$t('TITLES.notifications')"
      >
        <div class="flex flex-col h-screen">
          <div class="overflow-y-auto pb-20">
            <ul v-if="appStore.notifications.length">
              <li
                class="mb-3 last:mb-0"
                v-for="item in appStore.notifications"
                :key="item.id"
              >
                <notifications-card :item="item" />
              </li>
            </ul>
            <div v-else class="flex h-full flex-col items-center justify-center">
              <div class="my-auto space-y-4">
                <h3 class="text-center text-2xl font-bold">
                  {{ $t("TITLES.No notifications") }}
                </h3>
                <p class="mx-auto text-center text-gray-light">
                  {{ $t("TITLES.You dont have any notifications yet") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </menus-side-menu>
    </teleport>

    <teleport to="body">
      <profile-wallet-modal
        :wallet="wallet"
        :user-data="userData"
        v-if="walletMenu"
        @close="walletMenu = false"
        @seeAllWalletTransactions="seeAllWalletTransactions"
        :walletLoading="walletLoading"
      />
    </teleport>

    <teleport to="body">
      <profile-loyalty-modal
        v-if="loyaltyMenu"
        @close="loyaltyMenu = false"
        :loyalty="loyalty"
        :user-data="userData"
        @seeAllLoyaltyTransactions="seeAllLoyaltyTransactions"
        :loyaltyLoading="loyaltyLoading"
      />
    </teleport>
    <teleport to="body">
      <profile-all-loyalty-transactions-modal
        v-if="allLoyaltyTransactions"
        @close="allLoyaltyTransactions = false"
        :loyaltyTransactions="loyaltyTransactions"
        :loyaltyTransactionsLoading="loyaltyTransactionsLoading"
      />
    </teleport>

    <teleport to="body">
      <profile-all-wallet-transactions-modal
        v-if="allWalletTransactions"
        @close="allWalletTransactions = false"
        :walletTransactions="walletTransactions"
        :walletTransactionsLoading="walletTransactionsLoading"
      />
    </teleport>

    <teleport to="body">
      <menus-side-menu v-if="profileMenu" @close="profileMenu = false">
        <profile-menu-modal
          v-if="profileMenu"
          :user-data="userData"
          :deleteprimary="deleteprimary"
          :profile-list="profileList"
          :loyalty="loyalty"
          :loyaltyLoading="loyaltyLoading"
          :walletLoading="walletLoading"
          :wallet="wallet"
          :cms-page="cmsPage"
          @close="profileMenu = false"
          @openAddress="openAddress"
          @openWishlist="openWishlist"
          @openNotifications="changeNotificationStatus"
          @openLoyaltyMenu="openLoyaltyMenu"
          @openWalletMenu="openWalletMenu"
          @logout="logoutModal = true"
          @deleteAccount="deleteModal = true"
        />
      </menus-side-menu>
    </teleport>
    <teleport to="body">
      <general-confirm
        v-if="logoutModal"
        :title="t('TITLES.Logout')"
        :desc="t('TITLES.Are you sure you want to logout?')"
        :confirm-btn="t('BUTTONS.logout')"
        @close="logoutModal = false"
        @confirm="confirmLogout"
        :hideHeader="true"
        classes="pt-4"
      />
    </teleport>
    <teleport to="body">
      <general-confirm
        v-if="deleteModal"
        :title="t('BUTTONS.deleteAccount')"
        :desc="t('TITLES.Are you sure you want to delete your account?')"
        :confirm-btn="t('BUTTONS.deleteAccount')"
        @close="deleteModal = false"
        @confirm="deleteAccount"
        :hideHeader="true"
        classes="pt-4"
      />
    </teleport>
  </nav>
</template>

<script setup lang="ts">
import { useAppAuth } from "~/store/auth";
import { useAppStore } from "~/store/app";
import { useToast } from "vue-toastification";

const showTest = ref(false);

const { locale, t, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const targetLocale = computed(() => (locale.value === "ar" ? "en" : "ar"));
const switchPath = computed(() => switchLocalePath(targetLocale.value));
const { $api } = useNuxtApp();
const appAuth = useAppAuth();
const appStore = useAppStore();
const localePath = useLocalePath();
const cartCount = computed(() => appStore.getCartCount);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const isOpen = ref<boolean>(false);
const showSelect = ref<boolean>(false);

const userData = computed(() => appAuth.getUserData);

const isLoggedIn = appAuth.isLoggedIn;

const selectedBranch = useCookie<Branch | null>("selectedBranch");
const allStoresCookie = useCookie<string | null>("all_stores");
const showReservation = ref(false);

const smallNav = ref(false);
const profileMenu = ref(false);
const addressMenu = ref(false);
const notificationsMenu = ref(false);
const cartMenu = ref(false);
const wishlistMenu = ref(false);
const branchesMenu = ref(false);
const walletMenu = ref(false);
const loyaltyMenu = ref(false);
const deleteModal = ref(false);
const deleteprimary = ref(false);
const logoutModal = ref(false);
const allLoyaltyTransactions = ref(false);
const allWalletTransactions = ref(false);
const notificationToggle = ref(false);
const walletTransactionsLoading = ref(true);
const loyaltyTransactionsLoading = ref(true);
const loyaltyLoading = ref(true);
const walletLoading = ref(true);
const addLoading = ref(false);
const walletTransactions = ref([]);
const loyaltyTransactions = ref([]);
const loyalty = ref([]);
const wallet = ref([]);
const addresses = ref([]);

const cmsPage = computed(() => {
  return appStore.getCmsData?.filter((item) => item.in_menu);
});

function closeAllMenus() {
  addressMenu.value = false;
  cartMenu.value = false;
  wishlistMenu.value = false;
  walletMenu.value = false;
  loyaltyMenu.value = false;
  profileMenu.value = false;
  allLoyaltyTransactions.value = false;
  allWalletTransactions.value = false;
  notificationsMenu.value = false;
}

function notificationClick(id, item_id) {
  notificationsMenu.value = false;
  $api
    .patch(`notifications/${id}/read`)
    .then((res) => {
      router.push(`/order/${item_id}`);
    })
    .catch((e) => console.log(e));
}

function changeNotificationStatus() {
  $api
    .post("/setting/change_notification_status")
    .then((res) => {
      notificationToggle.value = false;
      appAuth.userData.notifiable = res.data.data.notifiable;
      toast.success(t("messages.notification_preference_updated"));
    })
    .catch((e) => {
      toast.error(e.response?.data?.message || "Failed");
    });
}

function openNotifications() {
  closeAllMenus();
  notificationsMenu.value = true;
}
async function openWishlist() {
  closeAllMenus();
  await appStore.getFavourites();
  wishlistMenu.value = true;
}
function openCart() {
  closeAllMenus();
  cartMenu.value = true;
}
const allStores = computed<Branch[]>(() => {
  try {
    return allStoresCookie.value ? JSON.parse(allStoresCookie.value) : [];
  } catch {
    return [];
  }
});
const toggle = () => (isOpen.value = !isOpen.value);

const onBranchSelected = (branch: Branch) => {
  selectedBranch.value = branch;
};

function getAddress() {
  addLoading.value = true;
  $api
    .get("/address")
    .then((res) => {
      addresses.value = res.data.data;
      addLoading.value = false;
    })
    .catch(() => (addLoading.value = false));
}

function getWallet() {
  walletLoading.value = true;
  $api
    .get("/wallet")
    .then((res) => {
      wallet.value = res.data.data;
      walletLoading.value = false;
    })
    .catch(() => (walletLoading.value = false));
}

function getLoyalty() {
  loyaltyLoading.value = true;
  $api
    .get("/loyal_card")
    .then((res) => {
      loyalty.value = res.data.data;
      loyaltyLoading.value = false;
    })
    .catch(() => (loyaltyLoading.value = false));
}

function getLoyaltyTransactions() {
  loyaltyLoading.value = true;
  $api
    .get("/loyal_card/transactions")
    .then((res) => {
      loyaltyTransactions.value = res.data.data;
      loyaltyTransactionsLoading.value = false;
    })
    .catch(() => (loyaltyTransactionsLoading.value = false));
}

function getWalletTransactions() {
  walletLoading.value = true;
  $api
    .get("/wallet/transactions")
    .then((res) => {
      walletTransactions.value = res.data.data;
      walletTransactionsLoading.value = false;
    })
    .catch(() => (walletTransactionsLoading.value = false));
}

function setData(values) {
  useCookie("store").value = values.branch;
  useCookie("selected-store").value = values.branch;
  selectedStore.value = values.branch;
  appStore.stores = values.branch;
  branchesMenu.value = false;
}
function openWalletMenu() {
  closeAllMenus();
  walletMenu.value = true;
}

function openLoyaltyMenu() {
  closeAllMenus();
  loyaltyMenu.value = true;
}

function seeAllLoyaltyTransactions() {
  closeAllMenus();
  getLoyaltyTransactions();
  allLoyaltyTransactions.value = true;
}

function seeAllWalletTransactions() {
  closeAllMenus();
  getWalletTransactions();
  allWalletTransactions.value = true;
}

const profileList = [
  {
    name: t("LABELS.My Account"),
    icon: "iconoir:user",
    path: "/profile",
  },
  {
    icon: "fluent:location-16-regular",
    name: t("LABELS.address"),
  },
  {
    name: t("LABELS.order"),
    icon: "lets-icons:bag",
    path: "/orders",
  },
  {
    name: t("LABELS.wishlist"),
    icon: "solar:heart-linear",
  },
  {
    name: t("LABELS.notifications"),
    icon: "solar:bell-linear",
  },
  {
    name: t("LABELS.loyalty Card"),
    icon: "streamline:coins-stack",
  },
  {
    name: t("LABELS.wallet"),
    icon: "stash:wallet",
  },
  {
    name: t("LABELS.faqs"),
    icon: "streamline-ultimate:contact-us-faq",
  },
];

function deleteAccount() {
  deleteprimary.value = true;
  $api
    .post("/setting/delete_account")
    .then(() => {
      useCookie("jwt_token_saas").value = null;
      useCookie("saas_user_data").value = null;
      useCookie("user_guest_token").value = null;
      appAuth.token = null;
      appAuth.userData = null;
      setTimeout(() => {
        deleteModal.value = false;
        deleteprimary.value = false;
        reloadNuxtApp();
      }, 300);
    })
    .catch((e) => {
      deleteprimary.value = false;

      toast.error(e.response.data.message);
    });
}

function confirmLogout() {
  appAuth.logout();

  setTimeout(() => {
    logoutModal.value = false;
    profileMenu.value = false;
  }, 300);
}

onMounted(() => {
  if (!selectedBranch.value) {
    showSelect.value = true;
  }
});

const isActive = (to: string) => route.path === to;

const items = computed(() => [
  { label: t("nav.home"), to: localePath("/") },
  { label: t("nav.menu"), to: localePath("/menu") },
  { label: t("nav.contact"), to: localePath("/contact") },
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

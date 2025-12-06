<template>
  <footer class="bg-footer text-website-white py-10 md:py-14">
    <div class="container mx-auto px-5 grid grid-cols-1 md:grid-cols-5 gap-10">
      <div
        class="space-y-6 col-span-1 md:col-span-2"
        v-if="appStore.settingsData.website_customization?.footer_main_part_availability"
      >
        <NuxtImg
          :src="appStore.settingsData.website_setting?.website_logo"
          alt="MEA TELECOM"
          class="w-32"
          v-if="appStore.settingsData.website_setting?.website_logo"
        />
        <p class="text-sm leading-relaxed">
          {{ appStore.settingsData.website_setting?.footer_desc }}
        </p>
      </div>

      <div>
        <h4 class="text-third mb-3">{{ $t("FOOTER.sections") }}</h4>
        <ul class="space-y-5 text-sm">
          <li>
            <NuxtLink :to="localePath('/menu')" class="hover:text-white">{{
              $t("FOOTER.menu")
            }}</NuxtLink>
          </li>
          <li v-if="appStore.settingsData.website_customization?.offers == 'show'">
            <NuxtLink :to="localePath('/offers')" class="hover:text-white">{{
              $t("FOOTER.offers")
            }}</NuxtLink>
          </li>
          <li>
            <button class="cursor-pointer" @click="showReservation = true">
              {{ $t("FOOTER.reservation") }}
            </button>
          </li>
          <li>
            <button class="cursor-pointer" @click.stop="openWishlist">
              {{ $t("FOOTER.favorites") }}
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-third mb-3">{{ $t("FOOTER.Links") }}</h4>
        <ul class="space-y-3">
          <li>
            <NuxtLink :to="localePath('/faqs')">{{ $t("FOOTER.FAQs") }}</NuxtLink>
          </li>
          <li v-for="page in appStore.cmsPages" :key="page.id">
            <NuxtLink :to="localePath(`/${page.slug}`)">
              {{ page.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-third mb-3">{{ $t("FOOTER.contact") }}</h2>
        <ul class="space-y-3" v-if="appStore.settingsData">
          <li>
            {{ $t("FOOTER.call center") }}
          </li>
          <li
            class="text-third"
            v-for="phone in appStore.settingsData.contact_us?.phone_number"
            :key="phone.id"
          >
            <a :href="`tel:${phone.phone}`">
              ({{ phone.phone_code }}) {{ phone.phone }}
            </a>
          </li>
          <hr class="border-[#F0F0F01A]" />
          <li>
            {{ $t("LABELS.email") }}
          </li>
          <li
            v-for="(email, index) in appStore.settingsData.contact_us?.email"
            :key="index"
            class="text-third"
          >
            <a :href="`mailto:${email}`">
              {{ email }}
            </a>
          </li>
        </ul>
      </div>
    </div>
      <div class="mb-3 mt-10 mx-auto  container">
        <hr />
        <div
          class="mt-7 flex items-center justify-between gap-5 ">
          <div>&copy; {{ currentYear }} {{ $t("FOOTER.rights") }}</div>
          <div class="social space-x-2" v-if="appStore.settingsData?.social_media_links">
            <a
              :href="appStore.settingsData?.social_media_links?.facebook"
              target="_blank"
            >
              <Icon name="mdi:facebook" />
            </a>
            <a
              :href="appStore.settingsData?.social_media_links?.twitter"
              target="_blank"
            >
              <Icon name="mdi:twitter" />
            </a>
            <a
              :href="appStore.settingsData?.social_media_links?.instagram"
              target="_blank"
            >
              <Icon name="mdi:instagram" />
            </a>
            <a
              :href="appStore.settingsData?.social_media_links?.linkedin"
              target="_blank"
            >
              <Icon name="mdi:linkedin" />
            </a>
          </div>
        </div>
      </div>
  </footer>
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
</template>
<script setup>
import { useAppStore } from "~/store/app";
const showReservation = ref(false);
const wishlistMenu = ref(false);
const appStore = useAppStore();
const localePath = useLocalePath();
const currentYear = new Date().getFullYear();
async function openWishlist() {
  await appStore.getFavourites();
  wishlistMenu.value = true;
}
</script>

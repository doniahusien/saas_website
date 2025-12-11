<template>
  <div
    v-if="sliders?.length && appStore.settingsData.website_customization?.slider_availability"
    class="relative"
  >
    <Swiper
      v-if="appStore.settingsData.website_customization?.slider_multi_image"
      :modules="[Navigation, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 8000 }"
      :navigation="navigationOptions"
      @swiper="onSwiperInit"
      class="h-250"
    >
      <SwiperSlide
        v-for="item in sliders"
        :key="item.id"
        class="bg-cover bg-no-repeat"
        :style="{ backgroundImage: `url('${item.image}')` }"
      >
        <div class="overlay"></div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6"
        >
          <div
            v-html="item.title"
            class="font-allura text-4xl md:text-6xl lg:text-7xl"
          ></div>

          <div
            v-html="item.desc"
            class="text-sm md:text-base lg:text-lg mb-6 opacity-90"
          ></div>

          <NuxtLink
            v-if="item.link"
            :href="item.link"
            class="text-sm md:text-base cursor-pointer flex items-center gap-2"
          >
            <span class="border-b-2">{{ $t("Discover More") }}</span>
            <Icon name="lucide:arrow-up-right" class="size-4" />
          </NuxtLink>
        </div>
      </SwiperSlide>
    </Swiper>
    <template v-else>
      <div
        class="relative bg-cover bg-no-repeat"
        :style="{ backgroundImage: `url('${sliders[0]?.image}')` }"
      >
        <div class="overlay"></div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6 h-screen"
        >
          <div
            v-html="sliders[0]?.title"
            class="font-allura text-4xl md:text-6xl lg:text-7xl"
          ></div>

          <div
            v-html="sliders[0]?.desc"
            class="text-sm md:text-base lg:text-lg mb-6 opacity-90"
          ></div>

          <NuxtLink
            v-if="sliders[0]?.link"
            :href="sliders[0].link"
            class="text-sm md:text-base cursor-pointer flex items-center gap-2"
          >
            <span class="border-b-2">{{ $t("Discover More") }}</span>
            <Icon name="lucide:arrow-up-right" class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </template>
    <div v-if="socialItems.length && appStore.settingsData?.social_media_links" class="absolute bottom-8 start-12 flex gap-3 z-20">
      <template v-for="(item, index) in socialItems" :key="index">
        <a
          :href="item.link"
          target="_blank"
          class="size-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 transition"
        >
          <Icon :name="item.icon" class="text-xl text-white" />
        </a>
      </template>
    </div>
    <div class="hidden absolute bottom-8 end-12 md:flex gap-3 z-30">
      <button
        ref="prevEl"
        class="size-10 cursor-pointer flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition"
      >
        <Icon name="lucide:chevron-left" class="size-5" />
      </button>

      <button
        ref="nextEl"
        class="size-10 cursor-pointer flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition"
      >
        <Icon name="lucide:chevron-right" class="size-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import { useAppStore } from "~/store/app";
import "swiper/css";
import "swiper/css/navigation";

const appStore = useAppStore();

const prevEl = ref(null);
const nextEl = ref(null);

const navigationOptions = ref({
  prevEl: null,
  nextEl: null,
});

const onSwiperInit = (swiper) => {
  swiper.params.navigation.prevEl = prevEl.value;
  swiper.params.navigation.nextEl = nextEl.value;

  swiper.navigation.init();
  swiper.navigation.update();
};

defineProps({
  sliders: {
    type: Array,
    required: true,
  },
});

const socialItems = computed(() => {
  const items = [];
  const links = appStore.settingsData?.social_media_links;

  if (links?.facebook) {
    items.push({ icon: "mdi:facebook", link: links.facebook });
  }
  if (links?.instagram) {
    items.push({ icon: "mdi:instagram", link: links.instagram });
  }
  if (links?.twitter) {
    items.push({ icon: "mdi:twitter", link: links.twitter });
  }
  if (links?.linkedin) {
    items.push({ icon: "mdi:linkedin", link: links.linkedin });
  }

  return items;
});
</script>

<style scoped>
.swiper,
.swiper-wrapper,
.swiper-slide,
.swiper-slide img {
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
}

.swiper-slide img {
  pointer-events: none;
}

.animate-fade-in {
  animation: fadeIn 1.2s ease-out forwards;
}
.animate-fade-in-delay {
  animation: fadeIn 1.4s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

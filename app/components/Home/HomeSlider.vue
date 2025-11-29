<template>
  <div v-if="sliders?.length" class="relative">
    <Swiper
      :modules="[Navigation, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 8000 }"
      :navigation="navigationOptions"
      @swiper="onSwiperInit"
      class="h-screen"
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
    <div v-if="contactItems.length" class="absolute bottom-8 start-12 flex gap-3 z-20">
      <template v-for="(item, index) in contactItems" :key="index">
        <NuxtLink
          :to="item.link"
          class="size-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 transition"
        >
          <Icon :name="item.icon" class="text-xl text-white" />
        </NuxtLink>
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
import "swiper/css";
import "swiper/css/navigation";

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
const { data } = await useAsyncData<ApiResponse<ContactData>>("contact_data", () =>
  useGlobalFetch<ApiResponse<ContactData>>("contact_data/web")
);

const contact = computed(() => data.value?.data || []);

const contactItems = computed(() => {
  const items = [];

  contact.value.forEach((entry) => {
    const key = entry.key;
    const value = entry.value;

    if (key === "facebook" && value) {
      items.push({ icon: "mdi:facebook", link: value });
    }
    if (key === "instagram" && value) {
      items.push({ icon: "mdi:instagram", link: value });
    }
    if (key === "x" && value) {
      items.push({ icon: "mdi:twitter", link: value });
    }

    if (key === "email" && Array.isArray(value) && value[0]) {
      items.push({ icon: "mdi:email-outline", link: `mailto:${value[0]}` });
    }

    if (key === "phone_number" && Array.isArray(value) && value[0]) {
      const phone = value[0];
      items.push({
        icon: "mdi:phone",
        link: `tel:+${phone.phone_code}${phone.phone}`,
      });
    }
  });

  return items;
});
</script>

<style scoped>
/* BUTTERY SMOOTH HARDWARE ACCELERATION */
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

/* Subtle fade-in animation */
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

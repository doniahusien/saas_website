<template>
  <div v-if="sliders?.length" class="relative w-full min-h-screen overflow-hidden">
    <Swiper
      :modules="[Navigation, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :navigation="{ prevEl: prevEl, nextEl: nextEl }"
      class="w-full min-h-screen"
    >
      <SwiperSlide
        v-for="item in sliders"
        :key="item.id"
        class="relative w-full h-screen"
      >
        <NuxtImg :src="item.image" alt="slider" class="w-full h-full object-cover" />

        <div class="absolute inset-0 bg-black/50"></div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6"
        >
          <div
            v-html="item.title"
            class="font-allura text-4xl md:text-6xl lg:text-7xl"
          ></div>

          <div
            v-html="item.desc"
            class="text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 opacity-90"
          ></div>

          <NuxtLink
            v-if="item.link"
            :href="item.link"
            class="text-sm md:text-base flex items-center gap-2"
          >
            <span class="border-b-2">Discover More</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
        <div
          v-if="contactItems.length"
          class="absolute bottom-8 left-12 flex space-x-4 z-20"
        >
          <template v-for="(item, index) in contactItems" :key="index">
            <NuxtLink
              :to="item.link"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 transition"
            >
              <Icon :name="item.icon" class="text-xl text-white" />
            </NuxtLink>
          </template>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="absolute bottom-8 right-12 flex gap-3 z-30">
      <button
        ref="prevEl"
        class="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition"
      >
        <Icon name="lucide:chevron-left" class="w-5 h-5" />
      </button>

      <button
        ref="nextEl"
        class="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition"
      >
        <Icon name="lucide:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>

  <p v-else class="text-center py-10 text-gray-400">No sliders available</p>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const prevEl = ref(null);
const nextEl = ref(null);

defineProps({
  sliders: {
    type: Array,
    required: true,
  },
});
const { data } = await useAsyncData("contact_data", () =>
  useGlobalFetch("contact_data/web")
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

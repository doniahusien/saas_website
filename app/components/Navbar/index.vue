<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 flex items-center  justify-between px-15 py-5',
      isScrolled
        ? 'bg-white text-medium-gray'
        : 'bg-nav-bg backdrop-blur-md text-nav-link',
    ]"
  >
    <UILogo />
    <NavbarNavLinks :isOpen="isOpen" />
    <div class="flex md:hidden cursor-pointer" @click="toggle">
      <svg
        v-show="isOpen == false"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: #737373"
      >
        <path d="M2 11H22V13H2zM2 5H22V7H2zM2 17H22V19H2z"></path>
      </svg>
      <svg v-show="isOpen == true"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: #737373"
      >
        <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path>
        <path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
      </svg>
    </div>
    <div class="hidden md:flex justify-center gap-5">
      <UILocaleSwitcher />
      <NuxtLink to ="/contact">
      <BaseButton v-if="isScrolled" :text="$t('hero.button')" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute();
const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const isScrolled = ref(false);

 const handleScroll = () => {
  const y = window.scrollY;
  const isHome = route.fullPath === '/';
  isScrolled.value = isHome ? y > 700 : y > 450;

};
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));



</script>

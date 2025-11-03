<template>
  <footer class="bg-black text-gray-300 py-10 md:py-14">
    <div class="container mx-auto px-5 grid grid-cols-1 md:grid-cols-5 gap-10">
      <div class="space-y-6 col-span-1 md:col-span-2 ">
        <NuxtImg src="/images/logo_white.png" alt="MEA TELECOM" class="w-32" />
        <p class="text-sm leading-relaxed text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo libero viverra
          dapibus odio sit malesuada in quis. Arcu tristique elementum viverra integer id.
        </p>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-3">Sections</h4>
        <ul class="space-y-5 text-sm">
          <li><NuxtLink to="/" class="hover:text-white">Menu</NuxtLink></li>
          <li><NuxtLink to="/" class="hover:text-white">Offers</NuxtLink></li>
          <li><NuxtLink to="/" class="hover:text-white">Reservation</NuxtLink></li>
          <li><NuxtLink to="/" class="hover:text-white">Favorit</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-3">Links</h4>
        <ul class="space-y-6 text-sm">
          <li><NuxtLink to="/" class="hover:text-white">Privacy policy</NuxtLink></li>
          <li><NuxtLink to="/" class="hover:text-white">FAQs</NuxtLink></li>
          <li><NuxtLink to="/" class="hover:text-white">Terms & conditions</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-3">Contact</h4>
        <div class="text-sm space-y-3">
          <p>Call Center</p>
          <p class="text-gray-400">(13) 3078-6114</p>
          <p>Email</p>
          <p class="text-gray-400">michelle.rivera@example.com</p>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto mt-16 border-t border-white pt-5 flex flex-col md:flex-row justify-between items-center gap-4 px-5"
    >
      <p class="text-xs text-white flex items-center gap-2">
        <Icon name="mdi:copyright" class="w-5 h-5" /> 2023 All Rights Reserved
      </p>

      <div class="flex items-center gap-4 text-white">
        <NuxtLink to="/" class="hover:text-gray-400">
          <span class="rounded-full border-white border p-2 flex items-center">
            <Icon name="lucide:facebook" />
          </span>
        </NuxtLink>
        <NuxtLink to="/" class="hover:text-gray-400">
          <span class="rounded-full border-white border p-2 flex items-center">
            <Icon name="mdi:twitter" />
          </span>
        </NuxtLink>
        <NuxtLink to="/" class="hover:text-gray-400">
          <span class="rounded-full border-white border p-2 flex items-center">
            <Icon name="mdi:instagram" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<template>
  <div
    class="bg-light-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 h-120 mx-4"
  >
    <button class="absolute top-4 right-4 text-gray-600 hover:text-black">
      <Icon name="mdi:close" class="cursor-pointer w-6 h-6" />
    </button>
    <h2 class="text-2xl font-bold mb-4">Add New Address</h2>
    <div class="space-y-4 bg-white">
      <div class="mt-auto">
        <button
          class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

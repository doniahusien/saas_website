<template>
  <div
    class="bg-semi-white rounded-2xl flex flex-col overflow-hidden shadow-lg p-6 relative w-full md:w-1/3 h-auto mx-4"
  >
    <button class="absolute top-8 right-5 text-black">
      <Icon name="mdi:close" class="cursor-pointer w-7 h-7" />
    </button>

    <h2 class="text-3xl font-bold mb-6">Add new address</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-lg font-semibold mb-1">Title</label>
        <input
          type="text"
          placeholder="Home2"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>

      <div>
        <label class="block text-lg font-semibold mb-1">Address</label>
        <input
          type="text"
          placeholder="Enter Your Address Here"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>

      <div>
        <label class="block text-lg font-semibold mb-1">Building No.</label>
        <input
          type="text"
          placeholder="Enter Your Building No. Here"
          class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
        />
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <label class="block text-lg font-semibold mb-1">Floor No.</label>
          <input
            type="text"
            placeholder="Enter Your Floor No. Here"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>

        <div class="flex-1">
          <label class="block text-lg font-semibold mb-1">Apartment No.</label>
          <input
            type="text"
            placeholder="Enter Your Apartment No. Here"
            class="w-full bg-white text-placeholder focus:outline-0 rounded-xl p-5 text-sm"
          />
        </div>
      </div>

      <div class="mt-4">
        <button
          class="w-full cursor-pointer bg-btn text-white gap-2 py-3 rounded-full font-semibold flex items-center justify-center"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

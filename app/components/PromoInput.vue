<template>
  <div class="relative bg-white border border-light-gray rounded-xl h-12 flex items-center">
    
    <Icon 
      :name="icon"
      class="absolute w-4 h-4 left-4 text-gray-200 text-lg"
    />

    <input
      type="text"
      :placeholder="placeholder"
      class="text-sm text-subtitle w-full outline-none pl-10 pr-20"
    />

    <button class="absolute right-4 text-primary text-sm font-semibold">
      Apply
    </button>

  </div>
</template>

<script setup>
defineProps({
  placeholder: String,
  icon: String
})
</script>

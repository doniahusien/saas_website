<template>
  <div class="relative">
    <div
      class="grid items-center"
      :style="{ 
        gridTemplateColumns: `repeat(${orderData.order_status.length}, 1fr)`,
        gridTemplateRows: 'auto auto' 
      }"
    >
      <template v-for="(status, index) in orderData.order_status" :key="status.key">
        <div class="flex justify-center relative">
          <div
            class="size-4 md:size-6 rounded-full flex items-center justify-center transition-all z-20 shrink-0"
            :class="{
              'bg-primary text-white scale-110': status.status === 'done' ,
              'bg-primary text-white': status.status === 'in_progress',
              'bg-gray-200 ': status.status == 'waiting'
            }"
          >
            <Icon name="mdi:check" class="size-2 md:size-4 text-white" />
          </div>
          <div
            v-if="index < orderData.order_status.length - 1"
            class="absolute  top-1/3 start-1/2 w-full -translate-y-1/2 z-10 h-0.5 px-2 rounded-full"
            :class="{
              'bg-primary': status.status === 'done' ,
              'bg-gray-200': status.status == 'waiting'|| status.status === 'in_progress'
            }"
          ></div>
        </div>
      </template>

      <template v-for="status in orderData.order_status" :key="status.key">
        <div class="text-center mt-2">
          <span
            class="text-lg font-medium whitespace-nowrap"
            :class="{
              'text-primary ': status.status === 'in_progress' || status.status === 'done',
              'text-gray-200': status.status == 'waiting'
            }"
          >
            {{ status.value }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  orderData: {
    type: Object,
    required: true,
  },
});
</script>
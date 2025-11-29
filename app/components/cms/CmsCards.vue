<template>
    <div class="rounded-xl bg-green-500">
        {{ items.title }}
        {{ items.desc }}
    </div>
</template>

<script setup>
defineProps({
    items: {
        required: false
    }
})
</script>

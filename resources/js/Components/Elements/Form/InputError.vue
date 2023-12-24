<script setup>
defineProps({
    message: {
        type: String,
    },
})
</script>

<template>
    <p v-if="message" class="text-sm text-red-600 dark:text-red-400 mt-2">
        {{ message }}
    </p>
</template>

<script setup>
defineProps({
    message: {
        type: String,
    },
})
</script>

<template>
    <p v-if="message" class="mt-2 text-sm text-red-600 dark:text-red-400">
        {{ message }}
    </p>
</template>

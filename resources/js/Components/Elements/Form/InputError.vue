<script setup>
defineProps({
    message: {
        type: String,
    },
})
</script>

<template>
    <div v-if="message">
        <p class="text-sm text-red-600 dark:text-red-400 my-2">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    hasBackground: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div
        class="bg-base-100 overflow-hidden shadow-sm rounded-lg mb-4 p-4 sm:p-8"
    >
        <div class="text-gray-900 dark:text-gray-100">
            <slot />
        </div>
    </div>
</template>

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
        class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg mb-4"
        :class="hasBackground ? 'rounded-lg shadow dark:bg-gray-900 dark:border-gray-800' : null"
    >
        <div class="p-4 text-gray-900 dark:text-gray-100">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    routeTo: {
        type: String,
        required: false,
    },
    isLink: {
        type: Boolean,
        default: true,
    }
})
</script>
<template>
    <div class="flex-1 pb-6">
        <component
            :is="isLink ? 'a' : 'div'"
            :href="routeTo ? route(routeTo) : null"
            class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-800"
            :class="isLink ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : null"
        >
            <h5 class="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-gray-400">{{ title }}</h5>
            <p class="text-2xl font-bold text-gray-700 dark:text-white">
                <slot />
            </p>
        </component>
    </div>
</template>

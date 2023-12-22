<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
    to: {
        type: String,
    },
})
</script>
<template>
    <component
        :is="type === 'link' ? 'a' : 'p'"
        :href="type === 'link' ? route(to) : null"
        :class="{
            'text-blue-500 font-bold uppercase': type === 'heading',
            'text-3xl lg:text-4xl font-bold leading-tight dark:text-white':
                type === 'title',
            'text-xl lg:text-2xl leading-tight text-gray-700 dark:text-gray-300':
                type === 'subtitle',
            'text-base lg:text-lg leading-loose text-gray-800 dark:text-gray-200':
                type === 'text',
            'underline text-lg leading-loose text-gray-800 dark:text-gray-200':
                type === 'link',
        }"
    >
        <slot></slot>
    </component>
</template>
<style scoped></style>

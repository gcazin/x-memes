<script setup>
defineProps({
    type: {
        type: String,
        default: 'text'
    },
    to: {
        type: String,
    }
})
</script>
<template>
    <component
        :is="type === 'link' ? 'a' : 'p'"
        :href="type === 'link' ? route(to) : null"
        :class="{
          'text-blue-500 font-bold pb-2 uppercase': type === 'heading',
          'text-3xl lg:text-4xl font-bold leading-tight pb-2 dark:text-white': type === 'title',
          'text-2xl leading-tight text-gray-700 dark:text-gray-300 pb-2': type === 'subtitle',
          'text-lg leading-loose text-gray-800 dark:text-gray-200 pb-2': type === 'text',
          'underline text-lg leading-loose text-gray-800 dark:text-gray-200 pb-2': type === 'link',
        }"
    >
        <slot></slot>
    </component>
</template>
<style scoped>
</style>

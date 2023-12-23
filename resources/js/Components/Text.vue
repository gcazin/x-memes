<script setup>
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    to: {
        type: String,
    },
    parameter: {
        type: String,
    },
})

const tagType = computed(() => {
    return {
        link: 'a',
        text: 'p',
        title: 'h1',
        subtitle: 'h2',
        sub: 'span',
        xs: 'span',
    }[props.type]
})
</script>
<template>
    <component
        :is="tagType"
        :href="type === 'link' ? route(to, parameter) : null"
        :class="{
            'text-blue-500 font-bold uppercase': type === 'heading',
            'text-3xl lg:text-4xl font-bold dark:text-white': type === 'title',
            'text-xl lg:text-2xl text-gray-700 dark:text-gray-300':
                type === 'subtitle',
            'text-base lg:text-lg text-gray-800 dark:text-gray-200':
                type === 'text',
            'text-sm lg:text-base text-gray-800 dark:text-gray-200':
                type === 'sub',
            'text-xs lg:text-sm': type === 'xs',
            'link link-hover': type === 'link',
        }"
    >
        <slot></slot>
    </component>
</template>
<style scoped></style>

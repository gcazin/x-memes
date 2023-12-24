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
            'font-bold uppercase text-blue-500': type === 'heading',
            'text-3xl font-bold lg:text-4xl dark:text-white': type === 'title',
            'text-xl text-gray-700 lg:text-2xl dark:text-gray-300':
                type === 'subtitle',
            'text-base text-gray-800 lg:text-lg dark:text-gray-200':
                type === 'text',
            'text-sm text-gray-800 lg:text-base dark:text-gray-200':
                type === 'sub',
            'text-xs lg:text-sm': type === 'xs',
            'link-hover link': type === 'link',
        }"
    >
        <slot></slot>
    </component>
</template>
<style scoped></style>

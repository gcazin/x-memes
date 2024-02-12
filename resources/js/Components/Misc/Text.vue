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
            'font-bold uppercase text-primary': type === 'heading',
            'text-3xl lg:text-4xl': type === 'title',
            'text-xl lg:text-2xl': type === 'subtitle',
            'text-base lg:text-lg': type === 'text',
            'text-sm lg:text-base': type === 'sub',
            'text-xs lg:text-sm': type === 'xs',
            'link-hover link': type === 'link',
        }"
    >
        <slot />
    </component>
</template>
<style scoped></style>

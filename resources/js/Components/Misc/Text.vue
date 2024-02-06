<script setup>
import { trans } from 'laravel-vue-i18n'
import { computed, useSlots } from 'vue'

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
const slots = useSlots()
const text = slots.default()[0].children
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
        <template v-if="text !== null && !Array.isArray(text)">
            {{ trans(text.trim()) }}
        </template>
        <template v-else>
            <slot />
        </template>
    </component>
</template>
<style scoped></style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    outline: {
        type: Boolean,
        default: true,
    },
    align: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: null,
    },
})
const sizeClass = computed(() => {
    return {
        '5xl': 'text-4xl lg:text-5xl',
        '4xl': 'text-3xl lg:text-4xl',
        '3xl': 'text-2xl lg:text-3xl',
        '2xl': 'text-xl lg:text-2xl',
        xl: 'text-lg lg:text-xl',
        lg: 'text-base lg:text-lg',
        md: 'text-sm lg:text-md',
        sm: 'text-xs lg:text-sm',
    }[props.size]
})
</script>
<template>
    <ion-icon
        :name="`${name}${outline ? '-outline' : ''}`"
        :class="[sizeClass]"
    ></ion-icon>
</template>

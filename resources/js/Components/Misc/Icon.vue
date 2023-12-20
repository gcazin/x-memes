<script setup>
import {computed} from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    outline: {
        type: Boolean,
        default: true
    },
    align: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: null,
    }
})
const sizeClass = computed(() => {
    return {
        '5xl': 'text-5xl',
        '4xl': 'text-4xl',
        '3xl': 'text-3xl',
        '2xl': 'text-2xl',
        'xl': 'text-xl',
        'lg': 'text-lg',
        'md': 'text-md',
        'sm': 'text-sm',
    }[props.size]
})
</script>
<template>
    <ion-icon
        :name="`${name}${outline ? '-outline' : ''}`"
        :class="[sizeClass, 'align-middle']"
    ></ion-icon>
</template>

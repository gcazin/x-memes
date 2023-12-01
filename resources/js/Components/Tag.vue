<template>
    <div
        class="w-fit py-2.5 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold dark:bg-blue-700 rounded-full transition-colors"
        :class="{
      'cursor-pointer bg-white hover:bg-blue-500 text-blue-500': button,
      'bg-blue-500 text-white': !button && !secondary,
      'bg-blue-100 text-blue-500': !button && secondary,
      'py-2.5 px-3.5': size === 'md',
      'py-1 px-2 text-sm': size === 'sm',
      'py-1 px-1 text-sm': size === 'xs',
    }"
    >
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    button: {
        type: Boolean,
        default: false,
    },
    secondary: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'md'
    }
})
</script>

<style scoped>

</style>

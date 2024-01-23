<script setup>
defineProps({
    size: {
        type: String,
        default: 'md',
    },
    type: {
        type: String,
        default: 'primary',
    },
    outline: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div
        class="badge"
        :class="{
            'badge-xs': size === 'xs',
            'badge-sm': size === 'sm',
            'badge-md': size === 'md',
            'badge-lg': size === 'lg',

            'badge-success': type === 'success',
            'badge-warning': type === 'warning',
            'badge-primary': type === 'primary',
            'badge-secondary': type === 'secondary',
            'badge-neutral': type === 'neutral',
            'badge-accent': type === 'accent',

            'badge-outline': outline,
        }"
    >
        <slot></slot>
    </div>
</template>

<style scoped></style>

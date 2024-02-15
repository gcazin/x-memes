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

            'badge-success hover:!border-success/0 hover:bg-success/50':
                type === 'success',
            'badge-warning hover:!border-warning/0 hover:bg-warning/50':
                type === 'warning',
            'badge-primary hover:!border-primary/0 hover:bg-primary/50':
                type === 'primary',
            'badge-secondary hover:!border-secondary/0 hover:bg-secondary/50':
                type === 'secondary',
            'badge-neutral hover:!border-neutral/0 hover:bg-neutral/50':
                type === 'neutral',
            'badge-accent hover:!border-accent/0 hover:bg-accent/50':
                type === 'accent',

            'badge-outline': outline,
        }"
    >
        <slot></slot>
    </div>
</template>

<style scoped></style>

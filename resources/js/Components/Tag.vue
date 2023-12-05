<template>
    <div
        class="badge"
        :class="{
          'badge-xs': size === 'xs',
          'badge-sm': size === 'sm',
          'badge-md': size === 'md',
          'badge-lg': size === 'lg',

          'badge-primary': type === 'primary',
          'badge-secondary': type === 'secondary',
          'badge-neutral': type === 'neutral',
          'badge-accent': type === 'accent',
        }"
    >
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        default: 'md'
    },
    type: {
        type: String,
        default: 'primary'
    }
})
</script>

<style scoped>

</style>

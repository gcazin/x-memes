<script setup>
import Button from '@/Components/Button/Button.vue'

defineProps({
    type: {
        type: String,
        default: 'primary',
    },
    loading: {
        type: Boolean,
    },
})
</script>

<template>
    <Button submit :disabled="loading">
        <span v-if="loading" class="loading loading-spinner"></span>
        <slot />
    </Button>
</template>

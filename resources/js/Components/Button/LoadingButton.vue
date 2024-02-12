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
    <span v-if="loading" class="loading loading-spinner"></span>
    <Button submit :disabled="loading">
        <slot />
    </Button>
</template>

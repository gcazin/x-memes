<script setup>
import Button from '@/Components/Button/Button.vue'
import { useSlots } from 'vue'

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

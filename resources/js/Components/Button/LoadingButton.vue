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

const slots = useSlots()
const text = slots.default()[0].children
</script>

<template>
    <span v-if="loading" class="loading loading-spinner"></span>
    <Button submit :disabled="loading">
        <template v-if="text !== null && !Array.isArray(text)">
            {{ $t(text.trim()) }}
        </template>
        <template v-else>
            <slot />
        </template>
    </Button>
</template>

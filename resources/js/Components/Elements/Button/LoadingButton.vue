<script setup>
defineProps({
    type: {
        type: String,
        default: 'primary',
    },
    loading: {
        type: Boolean,
    }
});
</script>

<template>
    <button class="btn btn-primary" :class="{'btn-disabled': loading}">
        <span v-if="loading" class="loading loading-spinner"></span>
        <slot />
    </button>
</template>

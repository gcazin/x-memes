<script setup>
defineProps({
    value: {
        type: String,
    },
    required: {
        type: Boolean,
    },
})
</script>

<template>
    <label
        class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
        <span v-if="value">
            {{ $t(value) }}
            <span class="text-red-500">{{ required ? '*' : null }}</span>
        </span>
        <span v-else><slot /></span>
    </label>
</template>

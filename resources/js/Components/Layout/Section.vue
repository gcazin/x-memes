<script setup>
defineProps({
    hasBackground: {
        type: Boolean,
        default: true,
    },
})
</script>
<template>
    <section
        class="mb-4 rounded-lg shadow-sm sm:p-8"
        :class="hasBackground ? 'bg-base-200' : ''"
    >
        <slot />
    </section>
</template>

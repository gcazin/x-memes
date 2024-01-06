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
        class="z-10 mb-4 rounded-lg px-4 py-2 lg:px-6 lg:py-4"
        :class="hasBackground ? 'bg-base-200 shadow-lg' : ''"
    >
        <slot />
    </section>
</template>

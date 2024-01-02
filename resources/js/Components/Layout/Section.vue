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
        class="z-10 mb-4 rounded-lg sm:p-8"
        :class="hasBackground ? 'bg-base-200 shadow-lg' : ''"
    >
        <slot />
    </section>
</template>

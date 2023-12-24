<script setup>
defineProps({
    hasBackground: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
    <section class="mb-4 rounded-lg bg-base-300 shadow-sm sm:p-8">
        <slot />
    </section>
</template>

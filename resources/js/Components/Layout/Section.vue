<script setup>
defineProps({
    hasBackground: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <section
        class="bg-base-300 shadow-sm rounded-lg mb-4 sm:p-8"
    >
        <slot />
    </section>
</template>

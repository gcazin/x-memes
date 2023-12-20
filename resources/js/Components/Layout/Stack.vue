<script setup>
defineProps({
    spacing: {
        type: String,
    },
})
</script>
<template>
    <section
        :class="spacing ? `gap-${spacing}` : 'space-y-4'"
    >
        <slot />
    </section>
</template>

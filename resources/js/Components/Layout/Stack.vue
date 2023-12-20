<script setup>
defineProps({
    spacing: {
        type: String,
    },
})
</script>
<template>
    <section
        :class="spacing ? `space-y-${spacing}` : 'space-y-4'"
    >
        <slot />
    </section>
</template>

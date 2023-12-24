<script setup>
defineProps({
    spacing: {
        type: String,
    },
})
</script>
<template>
    <section
        :class="
            spacing
                ? `space-y-${spacing} gap-y-${spacing}`
                : 'gap-y-4 space-y-4'
        "
    >
        <slot />
    </section>
</template>

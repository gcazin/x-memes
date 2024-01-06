<script setup>
import { computed } from 'vue'

const props = defineProps({
    spacing: {
        type: [String, Number],
        default: 4,
    },
})

const size = computed(() => {
    return `space-y-${props.spacing} gap-y-${props.spacing}`
})
</script>
<template>
    <section :class="size">
        <slot />
    </section>
</template>

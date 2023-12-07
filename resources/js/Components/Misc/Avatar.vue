<script setup>
import {computed} from "vue";

const props = defineProps({
    size: {
        type: String,
        default: 'md',
    }
})
const sizeClass = computed(() => {
    return {
        'full': 'w-96',
        'xl': 'w-64',
        'lg': 'w-32',
        'md': 'w-16',
        'sm': 'w-8',
    }[props.size]
})
</script>
<template>
    <div v-if="$page.props.auth.user.avatar" class="avatar">
        <div class="rounded" :class="[sizeClass]">
            <img :src="`/storage/${$page.props.auth.user.avatar}`" alt="Tailwind-CSS-Avatar-component" />
        </div>
    </div>
    <div v-else class="avatar placeholder">
        <div class="bg-base-100 text-neutral-content rounded-full" :class="[sizeClass]">
            <span class="text-xs">{{ $page.props.auth.user.name.slice(0,2) }}</span>
        </div>
    </div>
</template>

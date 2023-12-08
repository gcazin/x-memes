<script setup>
import {computed} from "vue";

const props = defineProps({
    size: {
        type: String,
        default: 'md',
    }
})
const avatarSizeClass = computed(() => {
    return {
        'full': 'w-96',
        'xl': 'w-64',
        'lg': 'w-32',
        'md': 'w-16',
        'sm': 'w-8',
    }[props.size]
})

const textSizeClass = computed(() => {
    return {
        'full': 'text-3xl',
        'xl': 'text-3xl',
        'lg': 'text-5xl',
        'md': 'text-xl',
        'sm': 'text-sm',
    }[props.size]
})
</script>
<template>
    <div v-if="$page.props.auth.user.avatar" class="avatar">
        <div class="rounded-full" :class="[avatarSizeClass]">
            <img :src="`/storage/${$page.props.auth.user.avatar}`" alt="Tailwind-CSS-Avatar-component" />
        </div>
    </div>
    <div v-else class="avatar placeholder">
        <div class="bg-primary text-neutral-content rounded-full" :class="[avatarSizeClass]">
            <span :class="[textSizeClass]">{{ $page.props.auth.user.username.slice(0,2) }}</span>
        </div>
    </div>
</template>

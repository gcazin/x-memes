<script setup>
import {computed} from "vue";
import {usePage} from "@inertiajs/vue3";

const page = usePage()
const authUser = page.props.auth?.user

const props = defineProps({
    size: {
        type: String,
        default: 'md',
        required: false,
    },
    user: {
        type: Array,
        required: false,
    }
})
const avatarSizeClass = computed(() => {
    return {
        'full': 'w-96',
        'xl': 'w-64',
        'lg': 'w-24',
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

const formatUsername = (username) => {
    return username.slice(0,2)
}
</script>
<template>
    <div v-if="user?.avatar || authUser.avatar" class="avatar">
        <div class="rounded-full" :class="[avatarSizeClass]">
            <img :src="`/storage/${user ? user.avatar : authUser.avatar}`" alt="Tailwind-CSS-Avatar-component" />
        </div>
    </div>
    <div v-else class="avatar placeholder">
        <div class="bg-primary text-neutral-content rounded-full" :class="[avatarSizeClass]">
            <span :class="[textSizeClass]">
                {{ user ? formatUsername(user.username) : formatUsername(authUser.username) }}
            </span>
        </div>
    </div>
</template>

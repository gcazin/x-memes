<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

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
    },
    rounded: {
        type: Boolean,
        default: true,
    },
})
const avatarSizeClass = computed(() => {
    return {
        full: 'w-96',
        xl: 'w-32',
        lg: 'w-24',
        md: 'w-16',
        sm: 'w-8',
    }[props.size]
})

const textSizeClass = computed(() => {
    return {
        full: 'text-5xl',
        xl: 'text-4xl',
        lg: 'text-3xl',
        md: 'text-xl',
        sm: 'text-sm',
    }[props.size]
})

const formatUsername = (username) => {
    return username.slice(0, 2)
}
</script>
<template>
    <div v-if="user?.avatar || authUser?.avatar" class="avatar">
        <div :class="[avatarSizeClass]">
            <img
                :src="`/storage/${user ? user.avatar : authUser.avatar}`"
                alt="Tailwind-CSS-Avatar-component"
                :class="rounded ? `rounded-full` : 'rounded'"
            />
        </div>
    </div>
    <div v-else class="avatar placeholder">
        <div
            class="bg-primary text-neutral-content"
            :class="[avatarSizeClass, rounded ? 'rounded-full' : 'rounded-lg']"
        >
            <span :class="[textSizeClass]">
                {{
                    user
                        ? formatUsername(user.username)
                        : formatUsername(authUser.username)
                }}
            </span>
        </div>
    </div>
</template>

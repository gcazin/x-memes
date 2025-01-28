<script setup>
import { computed } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        required: false,
    },
    size: {
        type: String,
        default: 'md',
        required: false,
    },
    customSize: {
        type: String,
        required: false,
    },
    circle: {
        type: Boolean,
        default: true,
    },
})

const avatarSizeClass = computed(() => {
    if (!props.customSize) {
        return {
            full: 'w-96',
            xl: 'w-32',
            lg: 'w-24',
            md: 'w-16',
            sm: 'w-10',
            xs: 'w-8',
        }[props.size]
    }

    return props.customSize
})

const getAvatar = () => {
    if (props.user) {
        return props.user.avatar.includes('avatar-placeholder')
            ? `https://api.dicebear.com/9.x/initials/svg?seed=${props.user?.username}&scale=90`
            : `/storage/${props.user.avatar}`
    }

    return `/images/avatars/default-avatar.png`
}
</script>
<template>
    <div class="avatar">
        <div :class="[avatarSizeClass]">
            <img
                :src="getAvatar()"
                :alt="user ? `Avatar de ${user?.username}` : 'Avatar'"
                class="object-cover"
                :class="{
                    'rounded-lg': !circle,
                    'rounded-full': circle,
                    'bg-white': !user,
                }"
            />
        </div>
    </div>
</template>

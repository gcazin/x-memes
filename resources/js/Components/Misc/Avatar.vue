<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

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
    /*rounded: {
        type: Boolean,
        default: true,
    },*/
})

const page = usePage()
const authUser = page.props.auth?.user

const avatarSizeClass = computed(() => {
    return {
        full: 'w-96',
        xl: 'w-32',
        lg: 'w-24',
        md: 'w-16',
        sm: 'w-8',
    }[props.size]
})

const avatar = () => {
    if (
        (props.user && !props.user.avatar.includes('avatar-placeholder')) ||
        (authUser && !authUser.avatar.includes('avatar-placeholder'))
    ) {
        console.log(
            `/storage/${props.user ? props.user.avatar : authUser.avatar}`
        )
        return `/storage/${props.user ? props.user.avatar : authUser.avatar}`
    }

    return `/images/${props.user?.avatar ?? authUser?.avatar}`
}
</script>
<template>
    <div class="avatar" :class="[avatarSizeClass]">
        <img
            :src="avatar()"
            :alt="`Avatar de ${user?.username ?? authUser?.username}`"
            class="rounded-lg"
        />
    </div>
</template>

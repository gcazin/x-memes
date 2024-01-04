<script setup>
import { usePage } from '@inertiajs/vue3'
import { computed, onMounted, ref } from 'vue'

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
})

onMounted(() => {
    if (props.user) {
        getAvatar()
    }
})

const page = usePage()
const authUser = page.props.auth?.user
let avatar = ref(
    authUser.avatar.includes('avatar-placeholder')
        ? `/images/${authUser.avatar}`
        : `/storage/${authUser.avatar}`
)

const avatarSizeClass = computed(() => {
    return {
        full: 'w-96',
        xl: 'w-32',
        lg: 'w-24',
        md: 'w-16',
        sm: 'w-8',
    }[props.size]
})

const getAvatar = () => {
    if (!props.user.avatar.includes('avatar-placeholder')) {
        avatar.value = `/storage/${props.user.avatar}`
    }

    avatar.value = `/images/${props.user?.avatar}`
}
</script>
<template>
    <div class="avatar" :class="[avatarSizeClass]">
        <img
            :src="avatar"
            :alt="`Avatar de ${user?.username ?? authUser?.username}`"
            class="rounded-lg"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
    size: {
        type: String,
        default: 'md',
        required: false,
    },
    user: {
        type: Object,
        required: false,
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

const getAvatar = () => {
    return props.user.avatar.includes('avatar-placeholder')
        ? `/images/${props.user.avatar}`
        : `/storage/${props.user.avatar}`
}
</script>
<template>
    <div class="avatar">
        <div :class="[avatarSizeClass]">
            <img
                :src="getAvatar()"
                :alt="`Avatar de ${user?.username}`"
                class="rounded-lg object-cover"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        required: true,
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
            xs: 'w-8'
        }[props.size]
    }

    return props.customSize
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
                    class="object-cover"
                    :class="{ 'rounded-lg': !circle, 'rounded-full': circle }"
                />
            </div>
        </div>
</template>

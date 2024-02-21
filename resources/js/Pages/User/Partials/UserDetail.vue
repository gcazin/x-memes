<script setup>
import FollowButton from '@/Components/Button/FollowButton.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'

defineProps({
    user: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <a
        :href="route('user.show', user.username)"
        class="flex items-center gap-4"
    >
        <Avatar :user="user" />
        <div>
            <Text>{{ user.username }}</Text>
            <Text type="sub">{{ user.description }}</Text>
        </div>
        <div class="ms-auto text-right">
            <FollowButton :user="user" />
        </div>
    </a>
</template>

<style scoped></style>

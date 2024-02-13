<script setup>
import FollowButton from '@/Components/Button/FollowButton.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'

defineProps({
    user: {
        type: Object,
    },
    hasBackground: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="card w-96 bg-base-300 shadow-xl">
        <figure class="px-10 pt-10">
            <Avatar size="xl" :user="user" />
        </figure>
        <div class="card-body items-center text-center">
            <a :href="route('user.show', user.username)" class="card-title">
                {{ user.username }}
                <RoleBadge :user="user" />
            </a>
            <p v-if="user.description">{{ user.description }}</p>
            <div class="card-actions">
                <FollowButton :user="user" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>

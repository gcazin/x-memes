<script setup>
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'
import Avatar from '@/Components/Misc/Avatar.vue'

defineProps({
    user: {
        type: Array,
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
            <h2 class="card-title">{{ user.username }}</h2>
            <p v-if="user.description">{{ user.description }}</p>
            <div class="card-actions">
                <FollowButton :user="user" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>

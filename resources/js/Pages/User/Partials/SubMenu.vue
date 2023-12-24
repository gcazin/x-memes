<script setup>
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'
import { usePage } from '@inertiajs/vue3'

const props = defineProps({
    user: {
        type: Array,
        required: true,
    },
})

const auth = usePage().props.auth?.user
</script>

<template>
    <div class="flex border-t border-base-100">
        <div role="tablist" class="tabs tabs-bordered tabs-lg flex-1">
            <a
                :href="route('user.show', user.username)"
                role="tab"
                class="tab pb-4"
                :class="{ 'tab-active': route().current('user.show') }"
            >
                Fil
            </a>
            <a
                :href="route('user.badge.index', user.username)"
                role="tab"
                class="tab pb-4"
                :class="{ 'tab-active': route().current('user.badges') }"
            >
                Badges
            </a>
            <a role="tab" class="tab pb-4">Éditer le profil</a>
        </div>
        <div class="flex-1 p-1 text-right">
            <template v-if="auth && user.id !== auth.id">
                <FollowButton :user="user" />
            </template>
        </div>
    </div>
</template>

<style scoped></style>

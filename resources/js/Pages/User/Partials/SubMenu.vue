<script setup>
import { usePage } from '@inertiajs/vue3'
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'

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
        <div role="tablist" class="flex-1 tabs tabs-lg tabs-bordered">
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
        <div class="flex-1 text-right p-1">
            <template v-if="auth && user.id !== auth.id">
                <FollowButton :user="user" />
            </template>
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import Badge from '@/Components/Misc/Badge.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

defineProps({
    user: {
        type: Object,
    },
    medias: {
        type: Array,
    },
})
</script>
<template>
    <UserLayout :user="user" :medias="medias">
        <div class="grid grid-cols-2 gap-4 py-4 text-center lg:grid-cols-6">
            <div
                v-if="user.badges.length"
                v-for="(badge, index) in user.badges"
                :key="index"
            >
                <Badge :badge="badge" />
            </div>
            <div v-else>Aucun badges</div>
        </div>
    </UserLayout>
</template>

<style scoped></style>

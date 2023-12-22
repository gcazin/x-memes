<script setup>
import UserLayout from '@/Pages/User/UserLayout.vue'
import Badge from '@/Components/Misc/Badge.vue'

defineProps({
    user: {
        type: Array,
    },
    medias: {
        type: Array,
    },
})
</script>
<template>
    <UserLayout :user="user" :medias="medias">
        <div class="grid grid-cols-6 text-center gap-4 py-10">
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

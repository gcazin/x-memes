<script setup>
import Badge from '@/Components/Misc/Badge.vue'
import Text from '@/Components/Misc/Text.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'

defineProps({
    user: {
        type: Object,
    },
    badges: {
        type: Array,
    },
})
</script>
<template>
    <UserLayout :user="user">
        <div class="grid grid-cols-2 gap-4 py-4 text-center lg:grid-cols-6">
            <div
                v-if="badges.length"
                v-for="(badge, index) in badges"
                :key="index"
            >
                <Badge
                    :badge="badge"
                    :placeholder="!user.badges.find((b) => b.id === badge.id)"
                />
            </div>
            <div v-else>
                <Text>{{ $t('Aucun badges') }}</Text>
            </div>
        </div>
    </UserLayout>
</template>

<style scoped></style>

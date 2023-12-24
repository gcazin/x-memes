<script setup>
import FollowButton from '@/Components/Elements/Button/FollowButton.vue'
import Avatar from '@/Components/Misc/Avatar.vue'
import Card from '@/Components/Misc/Card.vue'
import Text from '@/Components/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Table from '@/Pages/Admin/Partials/Table.vue'

defineProps({
    leaderboard: {
        type: Array,
    },
    users: {
        type: Object,
    },
    medias: {
        type: Object,
    },
})
</script>

<template>
    <PageLayout title="Classement des meilleurs contributeurs">
        <div class="mb-4 flex flex-col gap-2 lg:flex-row lg:gap-4">
            <Card
                v-for="(member, index) in leaderboard.slice(0, 3)"
                :key="index"
            >
                <div class="flex flex-col items-center justify-center gap-4">
                    <Avatar size="lg" :user="member" />
                    <Text type="subtitle">{{ member.username }}</Text>
                    <div class="badge badge-lg bg-primary/10 text-primary">
                        {{ member.medias_count }} médias postés
                    </div>
                    <FollowButton :user="member" />
                </div>
            </Card>
        </div>

        <Table
            :headers="['Rang', `Nom d'utilisateur`, 'Nombre de médias postés']"
            :items="leaderboard.slice(3)"
            :properties="['increment', 'username', 'medias_count']"
            has-background
        >
            <template #increment="{ index }">
                <span
                    class="whitespace-nowrap font-bold text-blue-500 dark:text-blue-600"
                >
                    {{ index + 1 }}
                </span>
            </template>
            <template #username="item">
                <a :href="route('user.show', item.username)">
                    <div class="flex items-center gap-x-4">
                        <Avatar :user="item" />
                        <span>
                            {{ item.username }}
                        </span>
                    </div>
                </a>
            </template>
        </Table>
    </PageLayout>
</template>

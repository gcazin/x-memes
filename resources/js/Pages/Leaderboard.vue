<script setup>
import FollowButton from '@/Components/Button/FollowButton.vue'
import Card from '@/Components/Misc/Card.vue'
import Text from '@/Components/Misc/Text.vue'
import Pagination from '@/Components/Table/Pagination.vue'
import Table from '@/Components/Table/Table.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import PageLayout from '@/Layouts/PageLayout.vue'

const props = defineProps({
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

const isTheFirstPage = () => {
    return props.leaderboard.current_page === 1
}

const calculateRank = () => {
    const leaderboard = props.leaderboard

    if (isTheFirstPage()) {
        return leaderboard.from + 3
    }

    return leaderboard.from
}
</script>

<template>
    <PageLayout title="Classement des meilleurs contributeurs">
        <div class="mb-4 flex flex-col gap-2 lg:flex-row lg:gap-4">
            <Card
                v-if="isTheFirstPage()"
                v-for="(member, index) in leaderboard.data.slice(0, 3)"
                :key="index"
            >
                <div class="flex flex-col items-center justify-center gap-4">
                    <a
                        :href="route('user.show', member.username)"
                        class="text-center"
                    >
                        <Avatar size="lg" :user="member" />
                        <Text type="subtitle">
                            {{ member.username }}
                        </Text>
                    </a>
                    <div class="badge badge-lg bg-secondary/10 text-secondary">
                        {{ member.medias_count }} médias postés
                    </div>
                    <FollowButton :user="member" />
                </div>
            </Card>
        </div>

        <Table
            :headers="['Rang', `Nom d'utilisateur`, 'Nombre de médias postés']"
            :items="
                isTheFirstPage() ? leaderboard.data.slice(3) : leaderboard.data
            "
            :properties="['increment', 'username', 'medias_count']"
            has-background
        >
            <template #increment="item">
                <Text class="font-bold !text-secondary">
                    {{ calculateRank() + item.index }}
                </Text>
            </template>
            <template #username="item">
                <a :href="route('user.show', item.username)">
                    <div class="flex items-center gap-x-4">
                        <Avatar :user="item" />
                        <span>
                            {{ item.username }}
                            <RoleBadge class="!align-text-top" :user="item" />
                        </span>
                    </div>
                </a>
            </template>
        </Table>

        <Pagination :item="leaderboard" />
    </PageLayout>
</template>

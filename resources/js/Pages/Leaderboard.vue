<script setup>
import FollowButton from '@/Components/Button/FollowButton.vue'
import Card from '@/Components/Misc/Card.vue'
import Text from '@/Components/Misc/Text.vue'
import Pagination from '@/Components/Table/Pagination.vue'
import Table from '@/Components/Table/Table.vue'
import Avatar from '@/Components/User/Avatar.vue'
import RoleBadge from '@/Components/User/RoleBadge.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import Tag from '@/Components/Misc/Tag.vue'

const props = defineProps({
    leaderboard: {
        type: Array,
    },
})

console.log(props.leaderboard)

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
                class="border lg:my-8"
                :class="{
                    'border-orange-500': index === 1,
                    'border-yellow-500 lg:order-1 lg:scale-110 lg:z-10': index === 0,
                    'border-primary lg:order-2': index === 2,
                }"
            >
                <Stack class="flex flex-col items-center justify-center" spacing="2">
                    <Tag
                        size="lg"
                        :type="index === 0 ? 'secondary' : index === 1 ? 'warning' : 'primary'"
                        :outline="index !== 0"
                    >
                        #{{ index + 1 }}
                    </Tag>
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
                        {{ member.point.amount }} points
                    </div>
                    <FollowButton :user="member" />
                </Stack>
            </Card>
        </div>

        <Table
            :headers="['Rang', `Nom d'utilisateur`, 'Nombre de points']"
            :items="
                isTheFirstPage() ? leaderboard.data.slice(3) : leaderboard.data
            "
            :properties="['increment', 'username', 'points']"
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
            <template #points="item">
                {{ item.point.amount }}
            </template>
        </Table>

        <Pagination :item="leaderboard" />
    </PageLayout>
</template>

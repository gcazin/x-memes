<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import Card from "@/Components/Misc/Card.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import PageLayout from "@/Layouts/PageLayout.vue";
import Avatar from "@/Components/Misc/Avatar.vue";
import Text from "@/Components/Text.vue";
import formService from "@/Services/form.service.js";
import FollowButton from "@/Components/Elements/Button/FollowButton.vue";

defineProps({
    leaderboard: {
        type: Array
    },
    users: {
        type: Object
    },
    medias: {
        type: Object
    }
})
</script>

<template>
    <PageLayout title="Classement des meilleurs contributeurs">
        <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 mb-4">
            <Card
                v-for="(member, index) in leaderboard.slice(0,3)"
                :key="index"
            >
                <div class="flex flex-col gap-4 justify-center items-center">
                    <Avatar size="lg" :user="member" />
                    <Text type="subtitle">{{ member.username }}</Text>
                    <div class="badge bg-primary/10 text-primary badge-lg">
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
                <span class="font-bold text-blue-500 whitespace-nowrap dark:text-blue-600">
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
